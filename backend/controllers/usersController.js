
import userCollection from "../models/userCollection.js";


import bcrypt from 'bcryptjs'


const salt = bcrypt.genSaltSync(10);

import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
import randomstring from "randomstring";
import Post from "../models/postCollection.js";


const SECRET = "hellohi";





const registerUser = async(req,res) =>{
try{
  const {name,email, password} = req.body;
  console.log(req.body)


  if(!name){
    return res.status(401).json({msg:"name is reqired"})
  }

  if (!email) {
    return res.status(401).json({ msg: "email is reqired" });
  }

  if (!password) {
    return res.status(401).json({ msg: "password is reqired" });
  }
let hashPassword = bcrypt.hashSync(password, salt)
 let exitingUser = await userCollection.findOne({ email });


if(exitingUser){
        let comparePassword = bcrypt.compareSync(password , exitingUser.password)
        console.log(comparePassword)
        if(comparePassword){
            res.status(200).json({msg:"user log in successfully" , user:exitingUser})
        }
        else{
            return res.status(401).json({msg:"incorrect password"})
        }
      }
// if (exitingUser) {
//       return res.status(401).json({ msg: "user already registered" });
// }
let data= await userCollection.insertOne({
  name:name,
  email:email,
  password:hashPassword
})
console.log(data)
res.status(201).json({msg:"user register successfully"})
}catch (error){
    res.status(500).json({ error: error.message });
}

}



const loginUser = async (req, res) => {
     const {email , password} = req.body;
     if(!email || !password){
         return res.status(401).json({msg:"please fill all details"})
     }
 
     
     let user = await userCollection.findOne({email}); // {}
 
     if(user){
         let comparePassword = bcrypt.compareSync(password , user.password);
         if(comparePassword){            
             let token = await jwt.sign({_id:user._id}, SECRET)
             return res.status(200).json({msg:"user log in successfully", user, token})
         }
         else{
             return res.status(401).json({msg:"incorrect password"})
         }
     }
     else{
         res.status(401).json({msg:"user not found please signup"})
     }
};
const updateUser = async (req, res) => {
   try{
     console.log("req.user =",req.user)
     const {_id} = req.user
     const { name, password, coverPic, profilePic } = req.body;
    if(password){
     var hashPassword = bcrypt.hashSync(password, salt);
    }
 
    let user = await userCollection.findByIdAndUpdate(_id, {
      name: name,
      password: hashPassword,
      coverPic,
      profilePic,
    });
 console.log(user)
    res.status(200).json({msg:"user updated successfully"})
    }
    catch(error){
     res.status(500).json({msg:error.message})
    }
};
const deleteUser = async (req, res) => {
    try{
        const {_id} = req.user
    let user = await userCollection.findByIdAndDelete(_id);
    res.status(200).json({msg:"user deleted successfully"})
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
};


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await userCollection.findOne({ email });

    if (user) {
      let resetToken = randomstring.generate(50); //fghjkl;;kjhgfyuioptrtyuiop
      user.resetPasswordToken = resetToken;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "anshshukla1g4@gmail.com",
          pass: "xefi nzxx aqvs rjkp",
        },
      });

      // Wrap in an async IIFE so we can use await.
      (async () => {
        const info = await transporter.sendMail({
          from: "anshshukla1g4@gmail.com",
          to: email,
          subject: "Reset Password Request",
          text: `please click the link below to update password \n http://localhost:9000/user/resetPassword/${resetToken}`, // plain‑text body
        });

        console.log("Message sent:", info.messageId);
      })();

      res
        .status(200)
        .json({ msg: "please check your email for further information" });
    } else {
      return res.status(401).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const resetPassword = async (req, res) => {
  // res.send("hello world")

  const { resetToken } = req.params;
  console.log(resetToken);

  let user = await userCollection.findOne({ resetPasswordToken: resetToken });

  if (user) {
    res.render("passResetPage", { resetToken });
  } else {
    res.status(401).json({ msg: "token expired" });
  }
};

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  let user = await userCollection.findOne({ resetPasswordToken: resetToken }); //{id name email password}

  if (user) {
    let hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    await user.save();

    res.status(200).json({ msg: "password updated successfully" });
    
  

   
  } else {
    res.status(401).json({ msg: "token expired" });
  }
};

const searchFriend = async (req, res) => {
  try {
    let { name } = req.query;
  
    
      if (name.length > 0) {
        let users = await userCollection.find({ name: new RegExp(name) });
        res.status(200).json(users);
        console.log(users);
      }
       else {
        res.status(200).json([]);
      }

    
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getFriend = async (req, res) => {
  const { friendId } = req.params;
  const friend = await userCollection.findById(friendId).select("-password");
  const friendPosts = await Post
    .find({ userId: friendId })
    .populate({ path: "userId", select: "name profilePic" })
    .populate({
      path: "comment",
      populate: { path: "userId", select: "name profilePic" },
    });

  res
    .status(200)
    .json({ msg: "data fetched successfully", friend, friendPosts });
};

const followUnfollowUser = async (req,res) =>{
try {
    
  const { _id } = req.user;


  const { friendId } = req.params;

  let user = await userCollection.findById(_id);
  let friend = await userCollection.findById(friendId);

  if (user.followings.includes(friendId) && friend.followers.includes(_id)) {
    user.followings.pull(friendId);
    friend.followers.pull(_id);
    await user.save();
    await friend.save();
    res.status(200).json({ msg: "unfollowed successfully" });
  } else {
    user.followings.push(friendId);
    friend.followers.push(_id);
    await user.save();
    await friend.save();
    res.status(200).json({ msg: "followed successfully" });
  }
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

const getLoggedInUSer = async(req,res)=>{
  try {
    const {_id} = req.user;
   let user = await userCollection.findById(_id).select('-password');
   res.status(200).json({user})
  } catch (error) {
   res.status(500).json({error:error.message})
  }
}

export {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword,
  updatePassword,
  searchFriend,
  getFriend,
  followUnfollowUser,
  getLoggedInUSer,
};




