const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');


router.post("",(req, res, next) => {
  const post = new Post({
    title : req.body.title,
    content : req.body.content

  });
  post.save().then(createdPost => {
    res.status(201).json({
    message: "Post added successfully",
    postId : createdPost._id
  });


  });
})

router.put("/:id", (req, res, next) =>{
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    content : req.body.content

  });
  Post.updateOne({_id : req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Post updated succesfully"});

  });
});

router.get("", (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery.find().then(documents =>{
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents
    });

  });

});

router.get("/:id",(req,res,next)=>{
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post noe found'});
    }
  })
})

router.delete("/:id", (req, res, next)=>{
 Post.deleteOne({ _id: req.params.id}).then(result => {
   console.log('deleted');
  res.status(200).json({message: 'Post Deleted'});
 });

});

module.exports = router;
