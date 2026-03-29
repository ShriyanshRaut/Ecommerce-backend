// middlewares/multer.middleware.js

import multer from "multer";

// store files temporarily (Cloudinary will take over later)
const storage = multer.diskStorage({});

// optional: file filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;