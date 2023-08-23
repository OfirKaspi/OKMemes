'use strict'

var gImgs = [
  { id: 1, url: 'images/1.jpg', keywords: [' funny ', 'cat'] },
  { id: 2, url: 'images/2.jpg', keywords: [' funny ', 'cat'] },
  { id: 3, url: 'images/3.jpg', keywords: [' funny ', 'cat'] },
  { id: 4, url: 'images/4.jpg', keywords: [' funny ', 'cat'] },
  { id: 5, url: 'images/5.jpg', keywords: [' funny ', 'cat'] },
  { id: 6, url: 'images/6.jpg', keywords: [' funny ', 'cat'] },
  { id: 7, url: 'images/7.jpg', keywords: [' funny ', 'cat'] },
  { id: 8, url: 'images/8.jpg', keywords: [' funny ', 'cat'] },
  { id: 9, url: 'images/9.jpg', keywords: [' funny ', 'cat'] },
  { id: 10, url: 'images/10.jpg', keywords: [' funny ', 'cat'] },
  { id: 11, url: 'images/11.jpg', keywords: [' funny ', 'cat'] },
  { id: 12, url: 'images/12.jpg', keywords: [' funny ', 'cat'] },
  { id: 13, url: 'images/13.jpg', keywords: [' funny ', 'cat'] },
  { id: 14, url: 'images/14.jpg', keywords: [' funny ', 'cat'] },
  { id: 15, url: 'images/15.jpg', keywords: [' funny ', 'cat'] },
  { id: 16, url: 'images/16.jpg', keywords: [' funny ', 'cat'] },
  { id: 17, url: 'images/17.jpg', keywords: [' funny ', 'cat'] },
  { id: 18, url: 'images/18.jpg', keywords: [' funny ', 'cat'] },
]
var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 1,
  lines: [
    { txt: ' I sometimes eat Falafel ', size: 20, color: 'red' },
    { txt: ' I sometimes eat Shwarma ', size: 25, color: 'blue' },
  ],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function setLineTxt(value) {
  gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function getMeme() {
  return gMeme
}

function getImg() {
  return gImgs
}
