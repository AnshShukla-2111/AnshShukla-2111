import mongoose from 'mongoose'




  async function connectToDb () {
try {
  await mongoose.connect("mongodb://localhost:27017/MyMedia");
  console.log("mongodb connected successfully");
} catch (error) {
  console.log("error in connecting mongodb");
}


}


export default connectToDb

