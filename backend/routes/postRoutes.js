import express from 'express';
import checkToken from '../middleware/checkToken.js';
import {
  createPost,
  deletePost,
  yourPosts,
  allPosts,
  likePost,
  commentPost,
} from "../controllers/postController.js";
const router = express.Router();
 router.post("/create",checkToken,createPost);
 router.delete("/delete/:postId",deletePost);
 router.get("/yourPosts",checkToken, yourPosts);
 router.get("/allPosts", allPosts);
 router.put("/likes/:postId", checkToken, likePost);
router.put("/comment/:postId", checkToken, commentPost);
 export default router;