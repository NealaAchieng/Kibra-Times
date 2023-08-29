const Post=require("../models/post")
const addPost= async(req, res) => {
    try {
      const {postImg,postTitle,postSummary,postBody,postCategory,postTags,postAuthor,postSection,postDate}=req.body
      const newPost=new Post({
          postImg,
          postTitle,
          postSummary,
          postBody,
          postCategory,
          postTags,
          postAuthor,
          postSection,
          postDate,
      })
      const savedpost= await newPost.save()
      res.status(201).json(savedpost)
  
  
    } catch (error) {
      console.log(error);
    }
  }

  const getPosts=async(req,res)=>{
    try{
  const posts=await Post.find()
  res.status(200).json(posts)
    }catch(err){
  res.status(404).json(err)
    }
  }
  const getPost=async(req,res)=>{
    try{
      const id = req.params.id;
      const post=await Post.findById(id);
      res.status(200).json(post);
    }catch(err){
      res.status (200).json(err)
    }
  }
  const updatedpost=async(req,res)=>{
    try{
      const id = req.params.id;
      const options={new:true}
      const updatedpost=await Post.findByIdAndUpdate(id,req.body,options)
      res.status(200).json(updatedpost)
    }catch(err){
  res.status(404).json(err)
    }
  }
  const deletePost=async(req,res)=>{
    try{
  const id=req.params.id;
  const deletedPost=await Post.findByIdAndDelete(id);
  res.status(200).json(deletedPost);
    }catch(err){
  res.status(404).json(err)
    }
  }


  module.exports={addPost,getPosts,getPost,updatedpost,deletePost}