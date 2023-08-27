const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/img/');
    },
    filename: (req, file, cb) => {
        cb(null, path.parse(file.originalname).name + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;