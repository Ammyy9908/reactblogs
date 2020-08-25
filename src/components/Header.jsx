import React,{useState,useEffect} from "react";
import Post from "./Post";
import axios from "axios";
const Header=()=>{  
const [data, setData] = useState([]);
useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://desolate-reaches-85560.herokuapp.com`,
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);

         
        return <div>
            <div className="container-fluid" style={{"marginTop":"100px"}}>
             
              
               
                {data.length>0?data.map((post) => (
        <Post key={post._id}
        id = {post._id}
        title={post.title}
        content = {post.content}
        pubAt = {post.createdAt}
        likes = {post.likes}
        tags = {post.tags}
        likedBy = {post.likedBy}
        postBy = {post.publishedBy}/>
          )):null}
               </div></div>}

export default Header;