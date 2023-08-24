'use strict'

var gImgs = [
  { id: 1, url: '/images/1.jpg', keywords: [' funny ', 'cat'] },
  { id: 2, url: '/images/2.jpg', keywords: [' funny ', 'cat'] },
  { id: 3, url: '/images/3.jpg', keywords: [' funny ', 'cat'] },
  { id: 4, url: '/images/4.jpg', keywords: [' funny ', 'cat'] },
  { id: 5, url: '/images/5.jpg', keywords: [' funny ', 'cat'] },
  { id: 6, url: '/images/6.jpg', keywords: [' funny ', 'cat'] },
  { id: 7, url: '/images/7.jpg', keywords: [' funny ', 'cat'] },
  { id: 8, url: '/images/8.jpg', keywords: [' funny ', 'cat'] },
  { id: 9, url: '/images/9.jpg', keywords: [' funny ', 'cat'] },
  { id: 10, url: '/images/10.jpg', keywords: [' funny ', 'cat'] },
  { id: 11, url: '/images/11.jpg', keywords: [' funny ', 'cat'] },
  { id: 12, url: '/images/12.jpg', keywords: [' funny ', 'cat'] },
  { id: 13, url: '/images/13.jpg', keywords: [' funny ', 'cat'] },
  { id: 14, url: '/images/14.jpg', keywords: [' funny ', 'cat'] },
  { id: 15, url: '/images/15.jpg', keywords: [' funny ', 'cat'] },
  { id: 16, url: '/images/16.jpg', keywords: [' funny ', 'cat'] },
  { id: 17, url: '/images/17.jpg', keywords: [' funny ', 'cat'] },
  { id: 18, url: '/images/18.jpg', keywords: [' funny ', 'cat'] },
]

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 1,
  lines: [
    { txt: ' I sometimes eat Falafel ', size: 20, color: 'red', isDrag: false },
    { txt: ' I sometimes eat Shwarma ', size: 25, color: 'blue', isDrag: false },
  ],
}

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

// function createNewLine(pos) {
//   gMeme.lines.push = {
//     pos,
//     txt: '---Add Text---',
//     size: 20,
//     color: 'blue',
//     isDrag: false,
//   }
// }

function isCircleClicked(clickedPos) {
  const { pos } = gCircle
  // Calc the distance between two dots
  const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
  // console.log('distance', distance)
  //If its smaller then the radius of the circle we are inside
  return distance <= gCircle.size
}

// GOOD ✔ - probably be broken when change the whole rendering process
function lineSwitch() {
  gMeme.selectedLineIdx++
  if (gMeme.lines.length <= gMeme.selectedLineIdx) gMeme.selectedLineIdx = 0
}

// GOOD ✔
function setLineTxt(value) {
  gMeme.lines[gMeme.selectedLineIdx].txt = value
}

// GOOD ✔
function changeTextColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value
}

// GOOD ✔
function changeFontSize(value) {
  gMeme.lines[gMeme.selectedLineIdx].size += value
}

// GOOD ✔
function setImg(el) {
  const url = new URL(el.src)
  const image = gImgs.find(img => img.url === url.pathname)
  gMeme.selectedImgId = image.id
}

function chooseInput(value) {
  gMeme.selectedLineIdx = value
}

// GOOD ✔
function getMeme() {
  return gMeme
}

// GOOD ✔
function getImg() {
  return gImgs
}
