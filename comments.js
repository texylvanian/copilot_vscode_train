//Create web server
var express = require('express');
var router = express.Router();

//Add mongoose
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost:27017/mean-demo', {useNewUrlParser: true});

//Create schema
var Schema = mongoose.Schema;

//Create comment schema
var CommentSchema = new Schema({
    name: String,
    comment: String
});

//Create model
var Comment = mongoose.model('Comment', CommentSchema);

//Create route to get comments from database
router.get('/comments', function(req, res){
    //res.send('Hello World');
    Comment.find({}, function(err, comments){
        if(err){
            console.log(err);
        } else {
            //console.log(comments);
            res.json(comments);
        }
    });
});

//Create route to insert comments into database
router.post('/comments', function(req, res){
    //console.log(req.body);
    //res.send('Hello World');
    Comment.create(req.body, function(err, comments){
        if(err){
            console.log(err);
        } else {
            //console.log(comments);
            res.json(comments);
        }
    });
});

//Create route to delete comments from database
router.delete('/comments/:id', function(req, res){
    //console.log(req.params.id);
    //res.send('Hello World');
    Comment.remove({_id: req.params.id}, function(err, comments){
        if(err){
            console.log(err);
        } else {
            //console.log(comments);
            res.json(comments);
        }
    });
});

//Create route to update comments in database
router.put('/comments/:id', function(req, res){
    //console.log(req.params.id);
    //res.send('Hello World');
    Comment.update({_id: req.params.id}, req.body, function(err, comments){
        if(err){
            console.log(err);
        } else {
            //console.log(comments);
            res.json(comments);
        }
    });
});

//Export router
module.exports = router;