
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
// import { updatePic } from "../redux/userSlice";
import axios from "axios";
import PostCard from "../components/PostCard";
import { fetchUserByToken } from "../redux/userSlice";

const UserProfile = () => {
 
  const [allPosts, setallPosts] = useState([]);
  let userSlice = useSelector((state)=>state.users);
  console.log(userSlice)
  let user = userSlice?.user
  let dispatch = useDispatch()


  const handleCoverChanger = async(e, name)=>{
      let file = e.target.files[0];
      console.log(file)
      console.log(name)

      let formData = new FormData();
      formData.append('file',file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

   let res = await axios.put(
     `https://api.cloudinary.com/v1_1/${
       import.meta.env.VITE_CLOUDNAME
     }/image/upload`,
     formData
   );
   console.log(res)

   let url = res.data.secure_url
console.log(url)
   console.log(userSlice.token)
   let res1 = await axios.put(
     "http://localhost:9000/user/updateUser",
     { [name]: url },
     {
       headers: {
         Authorization: userSlice.token,
       },
     }
   );

   let data1 = res1.data;
   console.log(data1)
   if(res1.status==200){
      // dispatch(updatePic({name,url}))
      dispatch(fetchUserByToken(userSlice?.token));
   }
  }
  // let profilePic = userSlice.user.profilePic
  // console.log(profilePic);
  // let coverPic = userSlice.user.coverPic
  // console.log(coverPic);




  const yourPosts = async () => {
    let res = await axios.get("http://localhost:9000/post/yourPosts", {
      headers: {
        Authorization: userSlice.token,
      },
    });
    console.log(res.data);
   
    setallPosts(res.data);

    

  }



  
  useEffect(()=>{
    yourPosts()

    
  },[userSlice?.token])
  return (
    <div className="container w-[90%]  m-auto ">
      <div className="w-full h-[50vh] relative">
        <img
          src={user?.coverPic}
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-3 right-6">
          <label htmlFor="profile">
            {" "}
            <FaCamera size={30} color="red" />
          </label>
          <input
            onChange={(e) => handleCoverChanger(e, "coverPic")}
            type="file"
            id="profile"
            hidden
          />
        </div>

        <div
          className="w-[200px] bottom-[0%] left-[5%] translate-y-[50%] h-[200px] rounded-full absolute border-s-gray-50 bg-sky-400
        "
        >
          <img
            src={user?.profilePic}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />

          <p className="text-center text-xl font-semibold">
            {userSlice?.user?.name}
          </p>
          <div className="absolute top-0 right-6">
            <label htmlFor="cover">
              {" "}
              <FaCamera size={30} color="red" />
            </label>
            <input
              onChange={(e) => handleCoverChanger(e, "profilePic")}
              type="file"
              id="cover"
              hidden
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 mt-5">
        <div className="box flex flex-col justify-center items-center text-xl">
          <h3 className="font-semibold">Followers</h3>
          <p>{userSlice?.user?.followers?.length}</p>
        </div>
        <div className="box flex flex-col justify-center items-center text-xl">
          <h3 className="font-semibold">Followings</h3>
          <p>{userSlice?.user?.followings?.length}</p>
        </div>
      </div>
      <div className="flex w-[400px] m-auto mt-[180px] flex-col gap-2">
        {allPosts.map((ele, i) => {
          return <PostCard key={ele._id} ele={ele} getallPosts={yourPosts} />;
        })}
      </div>
    </div>
  );
};

export default UserProfile;
    

















// import React, { useState } from "react";
// import { FaCamera } from "react-icons/fa6";

// const UserProfile = () => {
//   const [coverImage, setCoverImage] = useState(
//     ""
//   );
//   const [profileImage, setProfileImage] = useState(
//     ""
//   );

//   // ✅ Handle Cover Image Upload
//   const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(URL.createObjectURL(file));
//     }
//   };

//   // ✅ Handle Profile Image Upload
//   const handleProfileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="container w-[90%] m-auto">
//       <div className="w-full h-[50vh] relative">
//         {/* ✅ Cover Image */}
//         <img src={coverImage} className="w-full h-full object-cover" alt="" />

//         {/* ✅ Cover Image Camera Icon */}
//         <div className="absolute bottom-3 right-6">
//           <label htmlFor="cover">
//             <FaCamera size={30} color="black" className="cursor-pointer" />
//           </label>
//           <input
//             type="file"
//             id="cover"
//             hidden
//             accept="image/*"
//             onChange={handleCoverChange}
//           />
//         </div>

//         {/* ✅ Profile Section */}
//         <div className="w-[200px] bottom-[0%] left-[5%] translate-y-[50%] h-[200px] rounded-full absolute bg-green-500 overflow-hidden">
//           <img
//             className="w-full h-full rounded-full object-cover"
//             src={profileImage}
//             alt=""
//           />

//           {/* ✅ Profile Image Camera Icon */}
//           <div className="absolute top-0 right-6">
//             <label htmlFor="profile">
//               <FaCamera size={30} color="black" className="cursor-pointer" />
//             </label>
//             <input
//               type="file"
//               id="profile"
//               hidden
//               accept="image/*"
//               onChange={handleProfileChange}
//             />
//           </div>
//         </div>

//         {/* ✅ Name */}
//         <p className="text-center text-xl font-semibold mt-[100px]">
//       Ansh Shukla
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;











