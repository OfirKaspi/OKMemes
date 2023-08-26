// TODO - make the text downloaded aswell
// TODO - make the text dragable
// TODO - make the code more organized
// TODO - Q15 add a 'add line' button

'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

// GOOD ✔
function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderTextInput()
  renderGallery()
}

// function onSaveMeme() {
//   const canvasDataURL = gElCanvas.toDataURL()
//   const metadata = { timestamp: new Date().toISOString(), caption: 'My funny meme' }
//   saveMemeToLocalStorage(canvasDataURL, metadata)
// }

// GOOD
function onRandomMeme() {
  const imgs = getImgs()
  const randNum = getRandomIntInclusive(1, imgs.length)
  setSelectedImgId(imgs[randNum - 1].id)
  const elImg = document.querySelector(`img[src="images/${randNum}.jpg"]`)
  onSelectImg(elImg)
}

function onFilterByKeyword() {
  const keywordInput = document.querySelector('.keywordInput')
  const filterKeyword = keywordInput.value.toLowerCase()

  renderGallery(filterKeyword)
}

// GOOD ✔
function renderGallery(filterKeyword = '') {
  const images = getImgs()
  const filteredImages = filterKeyword
    ? images.filter(img => img.keywords.some(keyword => keyword.includes(filterKeyword)))
    : images

  const elNoImgMsg = document.querySelector('.no-images-msg')
  elNoImgMsg.style.display = filteredImages.length ? 'none' : 'block'

  const strHTMLs = filteredImages.map(
    img =>
      `<article>
          <img data-id="${img.keywords}" src="images/${img.id}.jpg" onclick="onSelectImg(this)"/>
        </article>`
  )

  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTMLs.join('')
}

function onSetLineText(el) {
  setLineText(el.value)
  renderMeme()
}

function renderTextInput() {
  const meme = getMeme()
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = meme.lines[meme.selectedLineIdx].txt
  console.log(elTextInput.value)
}

// PROBLEM👇
function renderMeme() {
  const meme = getMeme()
  const images = getImgs()
  const memeId = meme.selectedImgId
  const image = images.find(image => image.id === memeId)
  const newImage = new Image()
  newImage.src = image.url
  newImage.onload = () => {
    coverCanvasWithImg(newImage)
    drawText()
    // drawText(memeLine.text, memeLine.size, memeLine.color)
    // setOverlayText(meme)
  }
}

// PROBLEM👇
function onSelectImg(elImg) {
  const elModalOverlay = document.querySelector('.modal-overlay')
  elModalOverlay.style.display = 'flex'
  setImg(elImg)
  coverCanvasWithImg(elImg)
  renderMeme()
  // const meme = getMeme()
  // setOverlayText(meme)
}

// GOOD ✔
function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

// GOOD ✔ - needs to check if text is implemented
function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  console.log('dataUrl', dataUrl)

  elLink.href = dataUrl
  elLink.download = 'my-img'
}

// GOOD ✔
function onCloseModal() {
  const elModalOverlay = document.querySelector('.modal-overlay')
  elModalOverlay.style.display = 'none'
}

// GOOD ✔ - maybe can join it to the onCloseModal func
function stopPropagation(ev) {
  ev.stopPropagation()
}

// GOOD ✔
function onChangeTextColor(el) {
  changeTextColor(el.value)
  renderMeme()
}

// GOOD ✔
function onChangeFontSize(value) {
  changeFontSize(value)
  renderMeme()
}

// GOOD ✔ - probably be broken when change the whole rendering process
function onLineSwitch() {
  const lineText = lineSwitch()
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = lineText
  renderMeme()
}

function onChangeFont() {
  renderMeme()
}

function onChangeAlignment() {
  renderMeme()
}

function drawText(el = document.querySelector('.text-input'), x = gElCanvas.width / 2, y = 20) {
  const fontType = document.querySelector('.font-drop-down').value
  const fontAlign = document.querySelector('.font-align').value
  const meme = getMeme()
  const memeLine = meme.lines[meme.selectedLineIdx]
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = memeLine.color
  gCtx.font = `${memeLine.size}px ${fontType}`
  gCtx.textAlign = fontAlign
  gCtx.textBaseline = 'top'

  const textWidth = gCtx.measureText(el.value).width
  // let x = x

  if (fontAlign === 'left') {
    x = gElCanvas.width - textWidth // Adjust this value as needed for your desired left margin
  } else if (fontAlign === 'right') {
    x = 0 + textWidth // Adjust this value as needed for your desired right margin
  }

  gCtx.fillText(el.value, x, y)
  gCtx.strokeText(el.value, x, y)
}

// MAKE THE TEXT STAY INSIDE THE CANVAS

// function onToggleSecondLine(el) {
//   const meme = getMeme()
//   const lineText = meme.lines[1].txt
//   if (el.innerText === 'Add Line') {
//     drawText(lineText, gElCanvas.height / 2, gElCanvas.height - 20)
//     el.innerText = 'Remove Line'
//   } else {
//     el.innerText = 'Add Line'
//   }
//   toggleSecondLine()
//   renderMeme()
// }

// function wrapText(text) {
//   let linesArray = []
//   let lineCounter = 0
//   let line = ''
//   let words = text.split(' ')
//   for (let i = 0; i < words.length; i++) {
//     var testLine = line + words[i] + ' '
//   }
//   gCtx.fillText(testLine, gElCanvas.width / 2, gElCanvas.height / 2)
// }

// function renderLine() {
//   const meme = getMeme()
//   if (meme.selectedLineIdx < gMeme.lines.length) {
//     drawText(meme.lines)
//   }
// }

// function onChooseInput(value) {
//   chooseInput(value)
//   renderMeme()
// }

// PROBLEM👇
// function setOverlayText(meme) {
//   const elTopOverlayText = document.querySelector('.overlay-text-top')
//   elTopOverlayText.value = meme.lines[0].txt
//   elTopOverlayText.style.color = meme.lines[0].color
//   elTopOverlayText.style.fontSize = meme.lines[0].size + 'px'

//   const elbottomOverlayText = document.querySelector('.overlay-text-bottom')
//   elbottomOverlayText.value = meme.lines[1].txt
//   elbottomOverlayText.style.color = meme.lines[1].color
//   elbottomOverlayText.style.fontSize = meme.lines[1].size + 'px'
// }

// GOOD ✔
// function onChangeInput(el) {
//   setLineTxt(el.value)
//   renderText()
//   renderMeme()
// }
