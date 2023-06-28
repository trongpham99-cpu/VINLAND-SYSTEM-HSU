const multer = require('multer');
const path = require('path');

const ALLOW_FILE_UPLOAD_TYPE = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/heic'];
const MAXIMUM_FILE_SIZE = 1024 * 1024 * 5 * 5; // 5MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../public/uploads/');
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const isAllow = ALLOW_FILE_UPLOAD_TYPE.includes(file.mimetype);
    if (isAllow) {
        cb(null, true);
    }
    else {
        cb({ message: 'Unsupported file format' }, false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAXIMUM_FILE_SIZE
    },
});

module.exports = upload;