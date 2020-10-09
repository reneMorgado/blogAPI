const express = require('express')
const router = express.Router();
var postsCtl = require('../controllers/methods.js');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

router.get('/', postsCtl.getPosts)
router.post('/', postsCtl.postPosts)
router.put('/:id', postsCtl.updatePosts)
router.delete('/:id', postsCtl.deletePost)

module.exports = router;