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
  renderMeme()
  renderGallery()
}

// GOOD ✔
function renderGallery() {
  const images = getImg()
  const strHTMLs = images.map(
    img =>
      `<article>
          <img src="images/${img.id}.jpg" onclick="onSelectImg(this)"/>
        </article>`
  )

  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTMLs.join('')
}

// PROBLEM👇
function renderMeme() {
  const meme = getMeme()
  const images = getImg()
  const memeId = meme.selectedImgId
  const image = images.find(image => image.id === memeId)
  const newImage = new Image()
  newImage.src = image.url
  newImage.onload = () => {
    coverCanvasWithImg(newImage)
    // drawText('hello')
  }
  setOverlayText(meme)
}

// PROBLEM👇
function onSelectImg(elImg) {
  const elModalOverlay = document.querySelector('.modal-overlay')
  elModalOverlay.style.display = 'flex'
  setImg(elImg)
  coverCanvasWithImg(elImg)
  const meme = getMeme()
  setOverlayText(meme)
}

// GOOD ✔
function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

// PROBLEM👇
function setOverlayText(meme) {
  const elTopOverlayText = document.querySelector('.overlay-text-top')
  elTopOverlayText.value = meme.lines[0].txt
  elTopOverlayText.style.color = meme.lines[0].color
  elTopOverlayText.style.fontSize = meme.lines[0].size + 'px'

  const elbottomOverlayText = document.querySelector('.overlay-text-bottom')
  elbottomOverlayText.value = meme.lines[1].txt
  elbottomOverlayText.style.color = meme.lines[1].color
  elbottomOverlayText.style.fontSize = meme.lines[1].size + 'px'
}

// GOOD ✔
function onChangeInput(el) {
  setLineTxt(el.value)
  renderMeme()
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
  lineSwitch()
  renderMeme()
}

// MUST BE USED👇

// function drawText(text, fontSize = 16, color = 'black', x = 50, y = 50) {
//   gCtx.lineWidth = 2
//   gCtx.strokeStyle = 'brown'
//   gCtx.fillStyle = color
//   gCtx.font = `${fontSize}px Arial`
//   gCtx.textAlign = 'center'
//   gCtx.textBaseline = 'middle'

//   gCtx.fillText(text, x, y)
//   gCtx.strokeText(text, x, y)
// }
