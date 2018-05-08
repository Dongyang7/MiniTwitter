var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
	bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');
    
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/minitwitter', function(err, client) {
    if (err) throw err;
    else {
        app.listen(3000, function() {
            console.log("Server running on localhost port 3000!");
        })
    }
})

app.use(cors({
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
}));

var user_schema = new mongoose.Schema({
    username: String,
    password: String,
    commentId: String,
    postId: String
});
var user_model = mongoose.model('users', user_schema);

var post_schema = new mongoose.Schema({
    title: String,
    description: String,
    comments: Array,
    like: Array
});
var post_model = mongoose.model('posts', post_schema);

app.post('/adduser', function(req,res) {
    var user = user_model({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function(err,data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
})
app.post('/userlogin', function(req, res) {
    user_model.findOne({
        username: req.body.username,
        password: req.body.password
    }, function(err, data) {
        if (!data || err) {
            res.send({
                isLoggedIn: false,
                msg: 'Login failed'
            });
        } else {
            var token = jwt.sign({username: req.body.username},
                'minitwitter-secret-key',
                {expiresIn: '1h'});
            res.send({
                isLoggedIn: true,
                msg: 'Login success',
                token: token
            });
        }
    })
});

app.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers.token;
    if (token) {
        jwt.verify(token, 'minitwitter-secret-key', function(err, decoded) {
            if (!err) {
                console.log(decoded);
                next();
            } else {
                res.send({
                    msg: 'Invalid request, token not valid', isLoggedIn: false
                })
            }
        })
    } else {
        res.send({msg: 'Invalid request, empty token', isLoggedIn: false});
    }
});

app.post('/addpost', function(req, res) {
    var post = post_model({
        title: req.body.title,
        description: req.body.description
    });
    post.save(function(err, data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
});
app.post('/updatepost', function(req, res) {
    post_model.findOneAndUpdate({_id:req.body._id}, {
        title: req.body.title,
        description: req.body.description
    }, function(err, data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
})
app.get('/getposts', function(req, res) {
    post_model.find({}, function(err, data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
});
app.post('/getdetail', function(req, res) {
    post_model.findOne({title: req.body.postId}, function(err, data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
});
app.post('/getcomment', function(req, res) {
    post_model.findOne({_id: req.body.postId}, function(err, data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
});
app.post('/addcomment', function(req, res) {
    var token = req.body.token || req.query.token || req.headers.token;
    jwt.verify(token, 'minitwitter-secret-key', function(err, decoded) {
        post_model.findOneAndUpdate({_id: req.body.postId}, {"$push":{comments:{
            username: decoded.username,
            body: req.body.newcomment
        }}}, {new: true}, function(err, data) {
            if (err) {
                res.send({ok: false, data: err})
            } else {
                res.send({ok: true, data: data})
            }
        })
    })
});
app.post('/likepost', function(req, res) {
    var token = req.body.token || req.query.token || req.headers.token;
    jwt.verify(token, 'minitwitter-secret-key', function(err, decoded) {
        post_model.findOne({_id:req.body.pId, like:decoded.username}, function(err, result) {
            if (result) {
                post_model.findOneAndUpdate({_id:req.body.pId},
                    {"$pull":{like:decoded.username}}, {new: true}, function(err, data) {
                    if (err) {
                        res.send({ok: false, data: err})
                    } else {
                        res.send({ok: true, data: data})
                    }
                })
            } else {
                post_model.findOneAndUpdate({_id: req.body.pId},
                    {"$push":{like:decoded.username}}, {new: true}, function(err, data) {
                    if (err) {
                        res.send({ok: false, data: err})
                    } else {
                        res.send({ok: true, data: data})
                    }
                })
            }
        })
    })
});
app.post('/deletepost', function(req, res) {
    post_model.findOneAndRemove({_id: req.body.pId}, function(err, data) {
        if (err) {
            res.send({ok: false, data: err})
        } else {
            res.send({ok: true, data: data})
        }
    })
})