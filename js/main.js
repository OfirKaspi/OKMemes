// TODO - make the text downloaded aswell

'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
  renderGallery()
}

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

function renderMeme() {
  const meme = getMeme()
  const images = getImg()
  const memeId = meme.selectedImgId
  const image = images.find(image => image.id === memeId)
  const newImage = new Image()
  newImage.src = image.url
  newImage.onload = () => {
    coverCanvasWithImg(newImage)
  }
  setOverlayText(meme)
}

function onSelectImg(elImg) {
  const elModalOverlay = document.querySelector('.modal-overlay')
  elModalOverlay.style.display = 'flex'
  setImg(elImg)
  coverCanvasWithImg(elImg)
  const meme = getMeme()
  setOverlayText(meme)
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

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

function onChangeInput(el) {
  setLineTxt(el.value)
  renderMeme()

  //   el.style.width = 'auto'
  //   el.style.width = el.scrollWidth + 'px'
  //   el.style.width = el.value.length + 2 + 'ch'
}

function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  console.log('dataUrl', dataUrl)

  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-img'
}

function onCloseModal(el) {
  el.style.display = 'none'
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
