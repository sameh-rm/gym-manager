const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "/../uploads"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png|PNG|JPG|JPEG/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
  return extname;
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  const splitedPath = req.file.path.split("\\");
  res.send(`/uploads/${splitedPath[splitedPath.length - 1]}`);
});
module.exports = router;
