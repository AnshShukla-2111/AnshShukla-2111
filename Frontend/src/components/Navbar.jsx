// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { logout } from "../redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// const Navbar = () => {
//   const [showUl, setshowUl] = useState(false);

//   let userSlice = useSelector((state) => state.users);
//   console.log(userSlice);

//   let dispatch = useDispatch();
//   const handleShowUl = () => {
//     setshowUl(!showUl);
//   };
//   return (
//     <div className="sticky top-0 left-0 px-10 right-0 flex bg-black h-[65px] items-center justify-between text-white z-10">
//       <div className="flex items-center gap-1 h-[100%] ">
//         <img
//           className="w-30 h-[100%]"
//           src="https://static.vecteezy.com/system/resources/thumbnails/008/966/419/small/web-logo-web-letter-web-letter-logo-design-initials-web-logo-linked-with-circle-and-uppercase-monogram-logo-web-typography-for-technology-business-and-real-estate-brand-vector.jpg"
//           alt=""
//         />
//         {/* <h1>Social-App</h1> */}
//       </div>

//       <div className="h-full relative flex items-center">
//         <img
//           onClick={handleShowUl}
//           className="w-12 cursor-pointer h-12 rounded-full border border-amber-300"
//           src="https://as1.ftcdn.net/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
//           alt=""
//         />
//         {showUl && (
//           <ul className="flex flex-col bg-black text-white absolute top-full -right-1/2">
//             <li
//               onClick={() => {
//                 setshowUl(false);
//               }}
//               className="px-6 py-2 cursor-pointer"
//             >
//               <Link to={"/"}>Home</Link>
//             </li>
//             <li
//               onClick={() => {
//                 setshowUl(false);
//               }}
//               className="px-6 py-2 cursor-pointer"
//             >
//               <Link to={"/login"}>Login</Link>
//             </li>
//             <li
//               onClick={() => {
//                 setshowUl(false);
//               }}
//               className="px-6 py-2 cursor-pointer"
//             >
//               <Link to={"/signup"}>Signup</Link>
//             </li>
//             <li
//               onClick={() => {
//                 setshowUl(false);
//               }}
//               className="px-6 py-2 cursor-pointer"
//             >
//               <Link to={"/userProfile"}>Profile</Link>
//             </li>
//             <li
//               onClick={() => {
//                 dispatch(logout());
//                 setshowUl(false);
//               }}
//               className="px-6 py-2 cursor-pointer"
//             >
//               Logout
//             </li>
//           </ul>
//         )}
        
//       </div>
//     </div>
//   );
// };

// export default Navbar;







import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Navbar = () => {
  const [showUl, setShowUl] = useState(false);
const [searchFriends, setsearchFriends] = useState([]);


  // Access the entire user slice state
  const userSlice = useSelector((state) => state.users);
console.log(userSlice)




let login = userSlice.login;
console.log(login)

  // Get profile picture from nested user object with fallback
  const profilePic =
    userSlice?.user?.profilePic ||
    "https://as1.ftcdn.net/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg";

  const dispatch = useDispatch();

  const handleShowUl = () => {
    setShowUl(!showUl);
  };


  const handleSearch = async(e) =>{
    console.log(e.target.value)
    let val = e.target.value
    let res = await axios.get(`http://localhost:9000/user/searchFriends?name=${val}`,{
      headers:{
        'Authorization':userSlice.token
      }
     
    })
    console.log(res);
    let data = res.data;
    console.log(data)
    setsearchFriends(data);
  }

  return (
    <div className="sticky top-0 left-0 px-10 right-0 flex bg-black h-[65px] items-center justify-between text-white z-10">
      <div className="flex items-center gap-1 h-[100%]">
        <img
          className="w-30 h-[100%]"
          src="https://static.vecteezy.com/system/resources/thumbnails/008/966/419/small/web-logo-web-letter-web-letter-logo-design-initials-web-logo-linked-with-circle-and-uppercase-monogram-logo-web-typography-for-technology-business-and-real-estate-brand-vector.jpg"
          alt="Logo"
        />
        {/* <h1>Social-App</h1> */}
      </div>

      {login === true && (
        <form className="relative">
          <input
            type="text"
            onChange={handleSearch}
            className="border px-4 py-2 rounded"
            placeholder="search a friend.."
          />
          <div className="bg-black text-white absolute top-full w-full">
            {searchFriends.map((ele) => {
              return (
                <Link
                  onClick={() => setsearchFriends([])}
                  to={
                    userSlice.user._id === ele._id
                      ? "/userProfile"
                      : `/friendProfile?name=${ele.name}&id=${ele._id}`
                  }
                  state={ele._id}
                  className="flex gap-4 items-center border-b px-2 py-3"
                >
                  <img
                    src={ele.profilePic}
                    className="w-11 h-11 rounded-full border border-blue-400"
                    alt=""
                  />
                  <p>{ele.name}</p>
                </Link>
              );
            })}
          </div>
        </form>
      )}

      <div className="h-full relative flex items-center">
        <img
          onClick={handleShowUl}
          className="w-12 cursor-pointer h-12 rounded-full border border-amber-300 object-cover"
          src={profilePic}
          alt="Profile"
        />
        {showUl && (
          <ul className="flex flex-col bg-black text-white absolute top-full -right-1/2 rounded-md shadow-md">
            {/* <li
              onClick={() => setShowUl(false)}
              className="px-6 py-2 cursor-pointer hover:bg-gray-700"
            >
              <Link to={"/"}>Home</Link>
            </li>
            <li
              onClick={() => setShowUl(false)}
              className="px-6 py-2 cursor-pointer hover:bg-gray-700"
            >
              <Link to={"/login"}>Login</Link>
            </li>
            <li
              onClick={() => setShowUl(false)}
              className="px-6 py-2 cursor-pointer hover:bg-gray-700"
            >
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li
              onClick={() => setShowUl(false)}
              className="px-6 py-2 cursor-pointer hover:bg-gray-700"
            >
              <Link to={"/userProfile"}>Profile</Link>
            </li>
            <li
              onClick={() => {
                dispatch(logout());
                setShowUl(false);
              }}
              className="px-6 py-2 cursor-pointer hover:bg-red-700"
            >
              Logout
            </li> */}

            {login === true && (
              <li
                onClick={() => {
                  setShowUl(false);
                }}
                className="px-6 py-2 cursor-pointer"
              >
                <Link to={"/"}>Home</Link>
              </li>
            )}
            {login === false && (
              <li
                onClick={() => {
                  setShowUl(false);
                }}
                className="px-6 py-2 cursor-pointer"
              >
                <Link to={"/login"}>Login</Link>
              </li>
            )}
            {login === false && (
              <li
                onClick={() => {
                  setShowUl(false);
                }}
                className="px-6 py-2 cursor-pointer"
              >
                <Link to={"/signup"}>Signup</Link>
              </li>
            )}
            {login === true && (
              <li
                onClick={() => {
                  setShowUl(false);
                }}
                className="px-6 py-2 cursor-pointer"
              >
                <Link to={"/userProfile"}>Profile</Link>
              </li>
            )}
            {login === true && (
              <li
                onClick={() => {
                  dispatch(logout());
                  setShowUl(false);
                }}
                className="px-6 py-2 cursor-pointer"
              >
                Logout
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
