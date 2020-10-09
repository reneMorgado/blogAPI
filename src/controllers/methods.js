const blogPost = require('../models/post')

exports.getPosts = function(req, res) {
    blogPost.find(function(err, postG) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(postG);
    });
};

exports.postPosts = function(req, res, next) {
    var postN = new blogPost({
        cat: req.body.cat,
        name: req.body.name,
        description: req.body.description,
        leng: req.body.leng,
        link: req.body.link,
        gif: req.body.gif,
    });
    postN.save(function(err, postNR) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(postNR);
    });
};

exports.updatePosts = function(req, res) {
    blogPost.findById(req.params.id, function(err, postU) {
        postU.cat = req.body.cat;
        postU.name = req.body.name;
        postU.description = req.body.description;
        postU.leng = req.body.leng;
        postU.link = req.body.link;
        postU.gif = req.body.gif;
        postU.save(function(err, postUR) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(postUR);
        });
    });
};

exports.deletePost = function(req, res) {
    blogPost.findById(req.params.id, function(err, postD) {
        if (postD) {
            postD.remove(function(err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send({
                    "status": "ok"
                });
            })
        } else {
            res.status(500).send({
                "status": "not found"
            });
        }
    });
};