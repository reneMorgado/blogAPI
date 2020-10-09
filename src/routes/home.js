const express = require('express')
const multer = require('multer');
const router = express.Router();
const upload = multer();
var bodyParser = require('body-parser');
var postsCtl = require('../controllers/methods.js');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', postsCtl.getPosts)
router.post('/', upload.none(), postsCtl.postPosts)
router.put('/:id', postsCtl.updatePosts)
router.delete('/:id', postsCtl.deletePost)

module.exports = router;