import axios from "axios";
import React, { useRef } from "react";

const ForgetPassword = () => {
  let inputRef = useRef();
const handleForget = async () => {
  let obj = {
    email: inputRef.current.value,
  };
  alert("check your email");
  console.log(obj);

  try {
    let res = await axios.post(
      "http://localhost:9000/user/forgetPassword",
      obj
    );
    console.log(res);
    toast.success(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};
  
  return (
    <div>
      <h1 className="text-center text-amber-800">
        this is forget password page
      </h1>
      <div className="flex flex-col items-center mt-16 text-blue-800 ">
        <label htmlFor=""> email</label>

        <input
          ref={inputRef}
          type="email"
          placeholder="enter your email"
          className="text-center border-t-8 border-amber-950 border-dotteted border-2 text-blue-700"
        />
      </div>
      <button
        onClick={handleForget}
        className="bg-amber-800  p-2 rounded-md mt-4 hover:bg-amber-600 transition duration-300 ease-in-out jistify-center flex mx-auto text-cyan-400"
      >
        submit
      </button>
    </div>
  );
};

export default ForgetPassword;




