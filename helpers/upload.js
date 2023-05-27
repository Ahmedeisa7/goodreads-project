const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage/author-photos');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({ storage: Storage }).single('authorPhoto');
module.exports = upload;
