const express = require('express');
const Image = require('../../models/Image');
const ImageRouter = express.Router();
const multer = require('multer');
const fs = require('fs');

module.exports = function(app) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });

    app.route('/uploadmulter')
        .post(upload.single('imageData'), (req, res, next) => {
            const newImage = new Image({
                imageName: req.body.imageName,
                imageData: req.file.path
            });

            newImage.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        success: true,
                        document: result
                    });
                })
                .catch(err => next(err));
        });
    
    app.get('/uploads', (req, res) => {
        res.json('Must provide a file name!').status(404);
    });

    app.get('/uploads/:file', (req, res) => {
        res.sendFile('/uploads/' + req.params.file);
    });
}