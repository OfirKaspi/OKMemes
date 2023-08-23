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
  elGallery.innerHTML = strHTMLs.join()
}

function renderMeme() {
  const meme = getMeme()
  const images = getImg()
  const memeId = meme.selectedImgId
  const image = images.find(image => image.id === memeId)
  const newImage = new Image()
  newImage.src = image.url
  newImage.onload = () => {
    // Draw the image on the canvas
    coverCanvasWithImg(newImage)
  }
  setOverlayText(meme)
}

function onSelectImg(elImg) {
  coverCanvasWithImg(elImg)
  const meme = getMeme()
  setOverlayText(meme)
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function setOverlayText(meme) {
  const elOverlayText = document.querySelector('.overlay-text')
  elOverlayText.value = meme.lines[meme.selectedLineIdx].txt
  elOverlayText.style.color = meme.lines[meme.selectedLineIdx].color
  elOverlayText.style.fontSize = meme.lines[meme.selectedLineIdx].size + 'px'
}

function onChangeTextarea(el) {
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
  setLineTxt(el.value)

  //   el.style.width = 'auto'
  //   el.style.width = el.scrollWidth + 'px'
  //   el.style.width = el.value.length + 2 + 'ch'
}
