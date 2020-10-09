const post = require('../models/post')

exports.getPosts = function(req, res) {
    post.find(function(err, posts) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(posts);
    });
};

exports.postPosts = function(req, res, next) {
    var post = new blogPost({
        cat: req.body.cat,
        name: req.body.name,
        description: req.body.description,
        leng: req.body.leng,
        link: req.body.link,
        gif: req.body.gif,
    });
    post.save(function(err, post) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(post);
    });
};

exports.updatePosts = function(req, res) {
    post.findById(req.params.id, function(err, postU) {
        postU.cat = req.body.cat;
        postU.name = req.body.name;
        postU.description = req.body.description;
        postU.leng = req.body.leng;
        postU.link = req.body.link;
        postU.gif = req.body.gif;
        postU.save(function(err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(postU);
        });
    });
};

exports.deletePost = function(req, res) {
    post.findById(req.params.id, function(err, postD) {
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