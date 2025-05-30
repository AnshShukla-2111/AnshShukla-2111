import express from 'express';
import {
  deleteUser,
  followUnfollowUser,
  forgetPassword,
  getFriend,
  loginUser,
  registerUser,
  resetPassword,
  searchFriend,
  updatePassword,
  updateUser,
} from "../controllers/usersController.js";

import checkToken from "../middleware/checkToken.js";

 const router = express.Router()



router.post('/create',registerUser)
router.post('/login',loginUser)
router.put("/updateUser", checkToken,updateUser);
router.delete("/DeleteUser", checkToken,deleteUser);
router.post("/forgetPassword",forgetPassword );
router.get("/resetPassword/:resetToken", resetPassword);
router.put("/updatePassword/:resetToken", updatePassword);

router.get("/searchFriends", checkToken, searchFriend);

router.get("/friend/:friendId", checkToken, getFriend);

router.put("/followUnfollow/:friendId", checkToken, followUnfollowUser);
export default router