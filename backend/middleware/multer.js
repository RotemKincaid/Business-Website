import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // 10MB size limit
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('File type is not supported'), false);
      }
      cb(null, true);
    }

})

export default upload