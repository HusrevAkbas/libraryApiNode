import * as multer from 'multer'

const storage = multer.diskStorage({
    filename(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage: storage
}).single("file")

module.exports = upload