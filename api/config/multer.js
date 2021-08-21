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
    cb(null, mimetypeImages.includes(file.mimetype))
}

module.exports = multer({
  storage,
  fileFilter,
})
