import { createSlice } from "@reduxjs/toolkit";

let userData = JSON.parse(localStorage.getItem("MyMedia"));
const initialState = {
  login: userData ? true : false,
  user: userData ? userData.user : "",
  token: userData ? userData.token : "",
  loading: false
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setState: (state, action) => {
      // console.log(action.payload)
      localStorage.setItem("MyMedia", JSON.stringify(action.payload));
      state.login = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      localStorage.removeItem("MyMedia");
      state.login = false;
      state.user = "";
      state.token = "";
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updatePic:(state, action)=>{
      let {name,url} = action.payload;
      let copyObj = {...userData}
      let user = {...copyObj.user, [name]:url}
      copyObj.user = user
    
     localStorage.setItem('MyMedia',JSON.stringify(copyObj))

        state.user[name] = url;

    },
  
  },
});

// Action creators are generated for each case reducer function
export const { setState, logout, updateLoading,updatePic } = userSlice.actions;

export default userSlice.reducer;
