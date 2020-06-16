const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const dataCount = 50
const typeCount = 6
const trainPercent = 1
const trainPath = path.resolve(__dirname, '../train')
const testPath = path.resolve(__dirname, '../test')

const translate = {
  cane: 'dog',
  cavallo: 'horse',
  elefante: 'elephant',
  farfalla: 'butterfly',
  gallina: 'chicken',
  gatto: 'cat',
  mucca: 'cow',
  pecora: 'sheep',
  scoiattolo: 'squirrel',
  dog: 'cane',
  cavallo: 'horse',
  elephant: 'elefante',
  butterfly: 'farfalla',
  chicken: 'gallina',
  cat: 'gatto',
  cow: 'mucca',
  spider: 'ragno',
  squirrel: 'scoiattolo',
}

fse.removeSync(trainPath)
fse.removeSync(testPath)
fs.mkdirSync(trainPath)
fs.mkdirSync(testPath)

const rawImgPath = path.resolve(__dirname, '../raw-img')
const rawDir = fs.readdirSync(rawImgPath)

function append(dir, name, type, buffer) {
  const txt = `${name} ${type}\n`
  const txtPath = path.join(dir, 'train.txt')
  fs.writeFileSync(txtPath, txt, {
    flag: 'a+',
  })
  fs.writeFileSync(path.join(dir, name), buffer)
}



for (let i = 0; i < typeCount; i++) {
  const currentPath = path.join(rawImgPath, rawDir[i])
  const currentDir = fs.readdirSync(currentPath)
  for (let j = 0; j < dataCount; j++) {
    const fileName = currentDir[j]
    const buffer = fs.readFileSync(path.join(currentPath, fileName))
    if (j < dataCount * trainPercent) {
      append(trainPath, fileName, i, buffer)
    } else {
      append(testPath, fileName, i, buffer)
    }
  }
}

console.log('done')