const express = require('express')
const uploadRouter = express.Router()
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const status = require('../status_code/status_codes')

const allowedTypes = ['image/jpeg','image/jpg','image/png']
const imageMaxSize = 2 * 1024 * 1024
const mapping = []

const filterFileType = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)){
        const error = new Error("Only jpeg, jpg and png images are allowed.")
        error.code = "INCORRECT_FILETYPE"

        return cb(error, false)
    }

    return cb(null, true)
}

const s3config = new aws.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'ap-southeast-1',
    signatureVersion: 'v4',
    Bucket: process.env.AWS_BUCKET_NAME
})

const generateFileName = (req, file, cb) => {
    const fileName = file.originalname
    const fileNameParts = fileName.split('.')
    const extension = fileNameParts[fileNameParts.length-1]
    const nameInStorage = Date.now().toString() + '.' + extension
    const Mapping = {
        original: fileName,
        changed: nameInStorage
    }
    mapping.push(Mapping)
    cb(null, nameInStorage)
}

const multerS3Config = multerS3({
    s3: s3config,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, {
            fieldName : file.fieldname
        })
    },
    key: generateFileName
})

const upload = multer({
    storage: multerS3Config,
    fileFilter: filterFileType,
    limits: {
        fileSize: imageMaxSize
    }
})

const singleUpload = async (req, res) => {
    try {
        return res.json({
            message: "Image uploaded successfully",
            url: req.file.location,
            mapping
        })
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            error: "Could not upload image"
        })
    }
}

const multipleUpload = async (req, res) => {
    try{
        let images = []
        for (let image of req.files){
            images.push(image.location)
        }
        return res.json({
            message: "Images uploaded successfully",
            urls : images,
            mapping
        })
    }catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            error : "Could not upload image"
        })
    }
}


//Routes
uploadRouter.post('/upload/single', upload.single('image') ,singleUpload)
uploadRouter.post('/upload/multiple', [function (req, res, next){
    mapping.length = 0
    next()
},upload.array('images')], multipleUpload)

module.exports = {
    upload,
    singleUpload,
    multipleUpload,
    uploadRouter
}


