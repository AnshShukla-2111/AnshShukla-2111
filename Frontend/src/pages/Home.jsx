import React, { useEffect, useState } from "react";
import PostUploader from "../components/PostUploader";
import PostCard from "../components/PostCard";

import axios from "axios";

const Home = () => {







  const [allPost, setallPost] = useState([]);

  let getallPosts = async () => {
    let res = await axios.get("http://localhost:9000/post/allPosts");
    let data = res.data;
    console.log(data);
    setallPost(data);
  };

  useEffect(() => {
    getallPosts();
  }, []);

  return (
    <div>
      this is home page
      <PostUploader />
      <div className="flex w-[400px] m-auto flex-col gap-2 ">
        {allPost.map((ele,i) => {
          // return <PostCard key={ele._id} ele={ele} />;
          return (
            <PostCard
              getallPosts={getallPosts}
              key={ele._id}
              ele={ele}
              setallPost={setallPost}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
















