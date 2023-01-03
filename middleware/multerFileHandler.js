const Multer = require("multer");

const multer = Multer({
  storage: Multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${__dirname}`);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + "_" + file.originalname
      );
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  multer,
};
