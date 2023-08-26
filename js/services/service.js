'use strict'

const STORAGE_KEY = 'memeDB'

var gImgs = [
  { id: 1, url: '/images/1.jpg', keywords: ['funny', 'crazy'] },
  { id: 2, url: '/images/2.jpg', keywords: ['dog', 'cute'] },
  { id: 3, url: '/images/3.jpg', keywords: ['dog', 'cute', 'baby'] },
  { id: 4, url: '/images/4.jpg', keywords: ['funny', 'cat'] },
  { id: 5, url: '/images/5.jpg', keywords: ['funny', 'baby', 'strong'] },
  { id: 6, url: '/images/6.jpg', keywords: ['hahaha', 'explain', 'high'] },
  { id: 7, url: '/images/7.jpg', keywords: ['funny', 'suprise', 'man'] },
  { id: 8, url: '/images/8.jpg', keywords: ['lol', 'man'] },
  { id: 9, url: '/images/9.jpg', keywords: ['funny', 'lol'] },
  { id: 10, url: '/images/10.jpg', keywords: ['funny', 'barak'] },
  { id: 11, url: '/images/11.jpg', keywords: ['wow', 'kiss'] },
  { id: 12, url: '/images/12.jpg', keywords: ['funny', 'warning'] },
  { id: 13, url: '/images/13.jpg', keywords: ['amazing', 'leonardo'] },
  { id: 14, url: '/images/14.jpg', keywords: ['scary', 'sunglasses'] },
  { id: 15, url: '/images/15.jpg', keywords: ['handsome', 'circle'] },
  { id: 16, url: '/images/16.jpg', keywords: ['funny', 'lol'] },
  { id: 17, url: '/images/17.jpg', keywords: ['funny', 'putin', 'v'] },
  { id: 18, url: '/images/18.jpg', keywords: ['funny', 'astronaut'] },
]

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    { txt: ' I sometimes eat Falafel ', size: 30, color: '#ffffff', isDrag: false },
    { txt: ' I sometimes eat Shwarma ', size: 25, color: '#ffffff', isDrag: false },
  ],
}

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function lineSwitch() {
  gMeme.selectedLineIdx++
  if (gMeme.lines.length <= gMeme.selectedLineIdx) gMeme.selectedLineIdx = 0
  console.log(gMeme.lines[gMeme.selectedLineIdx].txt)
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setLineText(value) {
  gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function changeTextColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value
}

function changeFontSize(value) {
  gMeme.lines[gMeme.selectedLineIdx].size += value
}

function setSelectedImgId(id) {
  gMeme.selectedImgId = id
}

function setImg(el) {
  const url = new URL(el.src)
  const image = gImgs.find(img => img.url === url.pathname)
  gMeme.selectedImgId = image.id
}

function chooseInput(value) {
  gMeme.selectedLineIdx = value
}

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}
