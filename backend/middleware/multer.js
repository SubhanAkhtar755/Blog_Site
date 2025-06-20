import multer from "multer"

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
export const multipleUpload = multer({ storage }).array("files", 10); // max 10 images
