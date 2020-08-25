import React,{useState,useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import axios from "axios";
import UserPost from "./UserPost";



const ProtectedRoute = ({
    component: Component,
    ...rest
  }) => {
    function UpdateProfile(){
          const name = document.querySelector('.name').textContent;
          const uid = JSON.parse(localStorage.getItem('userData'))['uid'];
          axios.post(`https://desolate-reaches-85560.herokuapp.com/profile/update/uid/${uid}`,{name:name,id:uid}).then((response)=>{
  
            const userData=response.data.data.userData;
            localStorage.setItem('userData', JSON.stringify(userData));
           return <Route><Redirect to="/profile"></Redirect></Route>
          }).catch((error)=>{
            console.log(error);
          })
}

   
    const [data,setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          `https://desolate-reaches-85560.herokuapp.com/userpost/uid/${JSON.parse(localStorage.getItem('userData'))['uid']}`,
        );
   
        setData(result.data);
      };
   
      fetchData();
    }, []);
    return (
      <Route
        {...rest}


      

        
        render={props => {
          if (localStorage.getItem('userData')) {
            return <div className="container mt-5">
            <div className="row">
              <div className="col-lg-1">
              <img src={"https://avatars.dicebear.com/api/initials/"+JSON.parse(localStorage.getItem('userData'))['name']+".svg"} alt="avatar" className="rounded-circle img-fluid" width="75" height="75"/>
              </div>
              <div className="col-lg-6">
              <p className="text-muted display-4 name" contentEditable="true" suppressContentEditableWarning={true}>{JSON.parse(localStorage.getItem('userData'))['name']}</p>
              </div>
            </div>
           
            
            <p className="text-muted">{JSON.parse(localStorage.getItem('userData'))['uemail']}</p>
            <p className="text-muted">Last updated {new Date(JSON.parse(localStorage.getItem('userData'))['lastupdated']).toLocaleString()}</p>
            
            <button className="btn btn-danger"
        onClick={() => {
          localStorage.clear();
          props.history.push('/login');
          window.location.reload(false);
        }}
      >
        Logout
      </button>
        <button className="btn btn-primary ml-4" onClick={UpdateProfile}>Edit Name</button>
        <br/>
        <h1 className="display-6 mt-4">Your Posts</h1>
        <div className="row">
          <div className="col-lg-12">
            
          {data.map((post) => (
        <UserPost key={post._id}
                  id = {post._id}
                  title={post.title}
                  content = {post.content}
                  pubAt = {post.createdAt}
                  likes = {post.likes}
                  tags = {post.tags}
                  postBy = {post.publishedBy}/>
          ))}
            
          </div>
        </div>
      </div>;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "https://ammyy9908.github.io/reactblog/login",
                  state: {
                    from: props.location
                  }
                }}
              />
            );
          }
        }}
      />
      
    );
  };
  

export default ProtectedRoute;