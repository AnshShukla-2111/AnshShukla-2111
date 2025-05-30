// import mongoose from "mongoose";


// let userSchema = new mongoose.Schema(
//   {
//     name: { type: String, minLeanght: 2, maxLeanght: 100, default: "hahaha" },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     //   date: { type: Date, default: Date.now },
    
//   },
//   { timestamps: true }
// );


// userSchema.add({
//   resetPasswordToken: {
//     type: String,
//     default: null,
//   },

//   profilePic: {
//     type: String,
//     default:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O5VudUONoUmWrsGuyywkx3ws7OPELaiTHg&s",
//   },

//   coverPic: {
//     type: String,
//     default: "https://wallpapercave.com/wp/wp2657869.jpg",
//   },
// });


// // const users = mongoose.model("collectionName", structure);

// const users = mongoose.model('user', userSchema)
// export default users;















// import mongoose from "mongoose";

// let userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       minLength: 2,
//       maxLength: 100,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "password is required"],
//     },
//   },
//   { timestamps: true }
// );

// userSchema.add({
//   resetPasswordToken: {
//     type: String,
//     default: null,
//   },
//   profilePic: {
//     type: String,
//     default:
//       "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
//   },

//   coverPic: {
//     type: String,
//     default: "https://wallpapercave.com/wp/wp2657869.jpg",
//   },
// });

// // const users = mongoose.model('collectionName' , structure)
// const users = mongoose.model("users", userSchema);
// export default users;





// import mongoose from "mongoose";


// let userSchema = new mongoose.Schema(
//   {
//     name: { type: String, minLeanght: 2, maxLeanght: 100, default: "hahaha" },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     //   date: { type: Date, default: Date.now },
    
//   },
//   { timestamps: true }
// );


// userSchema.add({
//   resetPasswordToken: {
//     type: String,
//     default: null,
//   },

//   profilePic: {
//     type: String,
//     default:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O5VudUONoUmWrsGuyywkx3ws7OPELaiTHg&s",
//   },

//   coverPic: {
//     type: String,
//     default: "https://wallpapercave.com/wp/wp2657869.jpg",
//   },
// });


// // const users = mongoose.model("collectionName", structure);

// const users = mongoose.model('user', userSchema)
// export default users;















import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

userSchema.add({
  resetPasswordToken: {
    type: String,
    default: null,
  },
  profilePic: {
    type: String,
    default:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
  },

  coverPic: {
    type: String,
    default: "https://wallpapercave.com/wp/wp2657869.jpg",
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});




// const users = mongoose.model('collectionName' , structure)
const users = mongoose.model("user", userSchema);
export default users;