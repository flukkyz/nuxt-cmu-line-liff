const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./static/uploads/${file.fieldname.replace('_img','s').replace('_logo','s')}`)
  },
  filename: (req, file, cb) => {
    const mimetypes = {
      'image/png': '.png',
      'image/gif': '.gif',
      'image/jpg': '.jpg',
      'image/jpeg': '.jpg'
    }
    const random = crypto.randomBytes(3).toString('hex')
    cb(null, new Date().getTime() + '-' + random + mimetypes[file.mimetype])
  }
})

const fileFilter = (req, file, cb) => {
  const mimetypeImages = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg']
  // const fieldImages = [
  //   'blog_img',
  //   'alliance_img',
  //   'home_img',
  //   'utilization_img',
  //   'editor_img',
  //   'funding_img'
  // ]
  // if (fieldImages.includes(file.fieldname)) {
    cb(null, mimetypeImages.includes(file.mimetype))
  // }
}

module.exports = multer({
  storage,
  fileFilter,
})
