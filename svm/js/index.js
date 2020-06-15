let fs = require('fs')
// let request = require('request')
const axios = require('axios').default
const sharp = require('sharp')
let path = require('path')
// 下载单张图片 src是图片的网上地址 dest是你将这图片放在本地的路径 callback可以是下载之后的事}
const downloadImage = (src, dest) => {
  return axios
    .get(src, {
      responseType: 'stream',
    })
    .then((res) => {
      res.data.pipe(fs.createWriteStream(dest))
    })
}

const downloadSet = async (srcs, name) => {
  let count = 0
  for (let src of srcs) {
    try {
      if (!src) {
        continue
      }
      const ext = path.extname(src)
      const dest = path.resolve(__dirname, '../data', `${name} ${count}${ext}`)
      count++
      await downloadImage(src, dest)
    } catch (e) {
      continue
    }
  }
}

downloadSet(
  ["http://img2.imgtn.bdimg.com/it/u=234293492,2964278454&fm=26&gp=0.jpg","http://img5.imgtn.bdimg.com/it/u=1267755794,1897874823&fm=26&gp=0.jpg","http://img2.imgtn.bdimg.com/it/u=1101519187,4188141197&fm=26&gp=0.jpg","http://img2.imgtn.bdimg.com/it/u=2834935617,4277417703&fm=26&gp=0.jpg","http://img1.imgtn.bdimg.com/it/u=1012763108,3852168627&fm=26&gp=0.jpg","http://img3.imgtn.bdimg.com/it/u=2072494435,853546208&fm=26&gp=0.jpg","http://img1.imgtn.bdimg.com/it/u=1373836203,6561826&fm=26&gp=0.jpg","http://img5.imgtn.bdimg.com/it/u=2069266298,515098533&fm=26&gp=0.jpg","http://img5.imgtn.bdimg.com/it/u=1909905766,4220135021&fm=26&gp=0.jpg","http://img5.imgtn.bdimg.com/it/u=282781276,2855056135&fm=26&gp=0.jpg"],  'cat'
).then(console.log)
