import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    file: [],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
  },
  {
    timestamps: true,
  }
);
postSchema.add({
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comment: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
      },
    },
  ],
});
const Post = mongoose.model("posts", postSchema);
export default Post;



