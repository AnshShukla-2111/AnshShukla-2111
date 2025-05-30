// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { setState } from "../redux/userSlice";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// const Log = () => {


//     const dispatch = useDispatch();
//     const [loginData, setLoginData] = useState({
//       email: "",
//       password: "",
//     });





//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };
//   console.log(loginData);
//   const handleLogin = async() => {
//     // e.preventDefault();
//     const storedUser = JSON.parse(localStorage.getItem("signupData"));

//     if (!storedUser) {
//       alert("No user found. Please sign up first.");
//       navigate("/signup")
//       return;
//     }

//     if (
//       loginData.email === storedUser.email &&
//       loginData.password === storedUser.password
//     ) {
//       alert("Login successfull");
//       navigate("/");
//     } else {
//       alert("Invalid email or password.");
//       navigate("/signup")
//     }
  


  
//     e.preventDefault();
//     console.log(details);

//     try {
//       let res = await axios.post("http://localhost:9000/user/login", details);
//       console.log(res);
//       let data = res.data; // {msg:"login successfull", user:{id,name,email},token:"R$%KJHGFGH"}
//       console.log(data);
//       dispatch(setState(data));
//       if (res.status == 200) {
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.msg || "something went wrong");
//     }
//   }

//   return (
//     <div className="h-[90.6vh] bg-[url(https://img.freepik.com/premium-vector/padlock-with-keyhole-icon-personal-data-security-illustrates-cyber-data-information-privacy-idea-blue-color-abstract-hi-speed-internet-technology_542466-600.jpg)] bg-center bg-cover bg-blue-300 flex justify-center items-center gap-2">
//       <form className="p-8 rounded-xl w-[400px] bg-white/30 backdrop-blur-sm shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">
//           Login
//         </h2>

//         <input
//           type="email"
//           name="email"
//           value={loginData.email}
//           onChange={handleChange}
//           placeholder="Email Address"
//           className="w-full p-3 mb-4 border rounded-md"
//         />

//         <input
//           type="password"
//           name="password"
//           value={loginData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full p-3 mb-6 border rounded-md"
//         />
//         <Link to={"/forgetPassword"} className="text-end font-medium my-2 ">
//           forget password?
//         </Link>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-green-600 text-white py-3 rounded-md"
//         >
//           Login
//         </button>

//         <p className="text-center my-2 text-white">
//           not have an account ?
//           <Link to={"/signup"} className="text-blue-400">
//             signup
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Log;








import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setState } from "../redux/userSlice"; // Ensure this function exists in userSlice.js
import axios from "axios";

const Log = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("signupData")
      ? JSON.parse(localStorage.getItem("signupData"))
      : null;

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (
      loginData.email === storedUser.email &&
      loginData.password === storedUser.password
    ) {
      alert("Login successful");
      navigate("/");
    } else {
      alert("Invalid email or password.");
      navigate("/signup");
    }

    try {
      let res = await axios.post("http://localhost:9000/user/login", loginData);
      console.log(res);
      let data = res.data; // { msg: "login successful", user: { id, name, email }, token: "R$%KJHGFGH" }
      console.log(data);
      dispatch(setState(data));

      if (res.status === 200) {
        toast.success("Login successful!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="h-[90.6vh] bg-[url(https://img.freepik.com/premium-vector/padlock-with-keyhole-icon-personal-data-security-illustrates-cyber-data-information-privacy-idea-blue-color-abstract-hi-speed-internet-technology_542466-600.jpg)] bg-center bg-cover bg-blue-300 flex justify-center items-center gap-2">
      <form
        onSubmit={handleLogin}
        className="p-8 rounded-xl w-[400px] bg-white/30 backdrop-blur-sm shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-3 mb-4 border rounded-md"
        />

        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-md"
        />

        <Link to={"/forgetPassword"} className="text-end font-medium my-2">
          Forgot password?
        </Link>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md"
        >
          Login
        </button>

        <p className="text-center my-2 text-white">
          Not have an account?
          <Link to={"/signup"} className="text-blue-400">
            {" "}
            Sign up{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Log;