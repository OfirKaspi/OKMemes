'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderTextInput()
  renderGallery()
}

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
  }
}

function onSelectImg(elImg) {
  const elModalOverlay = document.querySelector('.modal-overlay')
  elModalOverlay.style.display = 'flex'
  setImg(elImg)
  coverCanvasWithImg(elImg)
  renderMeme()
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  console.log('dataUrl', dataUrl)

  elLink.href = dataUrl
  elLink.download = 'my-img'
}

function onCloseModal() {
  const elModalOverlay = document.querySelector('.modal-overlay')
  elModalOverlay.style.display = 'none'
}

function stopPropagation(ev) {
  ev.stopPropagation()
}

function onChangeTextColor(el) {
  changeTextColor(el.value)
  renderMeme()
}

function onChangeFontSize(value) {
  changeFontSize(value)
  renderMeme()
}

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

  if (fontAlign === 'left') {
    x = gElCanvas.width - textWidth // Adjust this value as needed for your desired left margin
  } else if (fontAlign === 'right') {
    x = 0 + textWidth // Adjust this value as needed for your desired right margin
  }

  gCtx.fillText(el.value, x, y)
  gCtx.strokeText(el.value, x, y)
}
