

// import Post from "../models/postCollection.js";






// const createPost = async (req, res) => {
//   // res.send('create post working')
//   try {
//     const { title, file } = req.body;
//     const { _id } = req.user;

//     let posts = await Post.insertOne({
//       title,
//       file,
//       userId: _id,
//     });
//     res.status(201).json({ msg: "post created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deletePost = async (req, res) => {
//   res.send("delete post working");
// };
// const yourPosts = async (req, res) =>{
//   try {
//     const { _id } = req.user;
//     const posts = await Post.find({ userId: _id }).populate({
//       path: "userId",
//       select: "name profilePic",
//     });
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
//  const allPosts = async (req, res) =>{
//   try {
//     const posts = await Post.find().populate({
//       path: "userId",
//       select: "name profilePic",
//     });
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   } }

// export { createPost, deletePost ,yourPosts , allPosts};





import { text } from "express";
import Post from "../models/postCollection.js";


const createPost = async (req, res) => {
  try {
    const { title, file } = req.body; 
    const { _id } = req.user; 

   
    let post = await Post.create({
      title,
      file,
      userId: _id,
    });

    res.status(201).json({ msg: "post created successfully", post });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a post (assuming you want to delete by postId param)
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // You can add authentication/authorization here to check if user owns the post

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get posts by the logged-in user
const yourPosts = async (req, res) => {
  try {
    const { _id } = req.user;
    // console.log(_id)=req.user;
    console.log(_id); // ✅ Correct way to log the user ID

    const posts = await Post.find({ userId: _id }).populate({
      path: "userId",
      select: "name profilePic",
    }).populate({path:'comment',populate:{path:'userId'}});
console.log(posts)
    res.status(200).json(posts);
  } catch (error) {
    console.error("Your posts error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all posts with user info populated
const allPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "userId",
      select: "name profilePic",
    }).populate({path:'comment',populate:{path:'userId',select:'name profilePic'}});

    res.status(200).json(posts);
  } catch (error) {
    console.error("All posts error:", error);
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;

    let post = await Post.findById(postId); // {}
    if (post.likes.includes(_id)) {
      post.likes.pull(_id);
      await post.save();
      res.status(200).json({ msg: "post disliked successfully" });
    } else {
      post.likes.push(_id);
      await post.save();
      res.status(200).json({ msg: "post liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 


const commentPost = async (req, res) => {
  const { _id } = req.user;
  const { postId } = req.params;
  const { text } = req.body;

  try {
    let post = await Post.findById(postId);

  

    post.comment.push({
      userId: _id,
      text: text,
    });
    await post.save();
    res.status(200).json({ msg: "Comment added successfully" })

  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
};




export { createPost, deletePost, yourPosts, allPosts, likePost, commentPost };
