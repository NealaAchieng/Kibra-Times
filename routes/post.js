const {addPost,getPosts,getPost,updatedpost,deletePost}=require("../controlers/post")
const express = require("express");
const router = express.Router();
// Adding Posts
router.post("/new",addPost);
// get all post
router.get("/",getPosts)
// single post
router.get("/:id",getPost)
// Update single post
router.patch("/update/:id",updatedpost)
// Delete posts
router.delete("/delete/:id",deletePost)
module.exports=router



