


import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confpassRef = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confpass = confpassRef.current.value;

    // Email validation
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailCheck = pattern.test(email);

    if (!emailCheck) {
      return alert("Please enter a valid email address.");
    }

    // Password match validation
    if (password !== confpass) {
      return alert("Passwords do not match!");
    }

    const userData = {
      name,
      email,
      password,
      confpass,
    };

    try {
      console.log(userData)

      const res = await axios.post(
        "http://localhost:9000/user/create",
        userData
      );
console.log(res)
      if (res.status === 200 || res.status === 201) {
        alert("Signup successful!");
        localStorage.setItem("signupData", JSON.stringify(userData));
        navigate("/login");
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status === 409) {
        alert("User already exists!");
      } else {
        alert("Signup failed. Please try again.");
        console.error(err);
      }
    }
  };
  return (
    <div className="h-[90.6vh] bg-[url(https://img.freepik.com/premium-vector/padlock-with-keyhole-icon-personal-data-security-illustrates-cyber-data-information-privacy-idea-blue-color-abstract-hi-speed-internet-technology_542466-600.jpg)] bg-center bg-cover bg-blue-300 flex justify-center items-center gap-2">
      <form
        onSubmit={handleSignup}
        className="signupForm flex flex-col p-8 rounded-xl gap-2 w-[400px] bg-red-200/30 shadow-md backdrop-blur-sm"
      >
        <label className="text-white">Name</label>
        <input
          ref={nameRef}
          className="border rounded-md px-4 py-2 bg-white"
          type="text"
          required
        />

        <label className="text-white">Email</label>
        <input
          ref={emailRef}
          className="border rounded-md px-4 py-2 bg-white"
          type="email"
          required
        />

        <label className="text-white">Password</label>
        <input
          ref={passwordRef}
          className="border rounded-md px-4 py-2 bg-white"
          type="password"
          required
        />

        <label className="text-white">Confirm Password</label>
        <input
          ref={confpassRef}
          className="border rounded-md px-4 py-2 bg-white"
          type="password"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-red-800 rounded-md px-4 py-2"
        >
          Signup
        </button>

        <p className="text-center my-2 text-white">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;








