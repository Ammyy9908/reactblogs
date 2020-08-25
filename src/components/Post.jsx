import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faPaperPlane } from '@fortawesome/free-solid-svg-icons'



export default class Post extends React.Component{
    // eslint-disable-next-line
    constructor(props){
            super(props);
    }
    likPost(e){
        const id=e.target.id;
        axios.post(`http://localhost:5000/post/like/uid/${id}`,{id:JSON.parse(localStorage.getItem('userData'))['uid']}).then((response)=>{
            if(response.status===200)
            {
                window.location = "/";
            }
                }).catch((error)=>{
                    console.log(error);
    });

    }

    unlikePost(e){
        const id=e.target.id;
        axios.post(`https://desolate-reaches-85560.herokuapp.com/post/dislike/uid/${id}`,{id:JSON.parse(localStorage.getItem('userData'))['uid']}).then((response)=>{
            if(response.status===200)
            {
                window.location = "/";
            }
                }).catch((error)=>{
                    console.log(error);
    });
    }
    render(){
        return <div>
            <div className="card mb-4" style={{"maxWidth":"550px","margin":"auto","minHeight":"300px"}}>
                    <img src={`https://source.unsplash.com/random/${this.props.tags[0]}`} className="card-img-top" alt={"image"+this.props.id}/>
                    <div className="card-body">
                        <h1 className="card-title text-primary">{this.props.title}</h1>
                        <p className="text-muted">{this.props.content}</p>
                        <small>by :{this.props.postBy}</small><br/>
                        <span>Published at:</span><strong> {new Date(this.props.pubAt).toLocaleString()}</strong>
                       {this.props.likes>0?<p className="text-muted">{this.props.likedBy.length>1? this.props.likedBy[0]+" and "+this.props.likedBy.filter(item => item!==this.props.likedBy[0]).length+" others likes this post":this.props.likedBy[0]+" like this post"}</p>:null}
                    <p> {localStorage.getItem('userData')!==null?!this.props.likedBy.includes(JSON.parse(localStorage.getItem('userData'))['name'])?<button className="btn btn-link btn-sm ml-0" onClick={this.likPost} id={this.props.id}>Like</button>:<button className="btn btn-link btn-sm ml-0" id={this.props.id} onClick={this.unlikePost}>Unlike</button>:null}<FontAwesomeIcon icon={faHeart} color="red" /> {this.props.likes}</p>
                    <strong>Tags:</strong>{this.props.tags.map(tag =>tag+",")}<br/><br/>
                    {/* <div className="row">

                    <div className="col-lg-10">

                    
                    <input type="text" className="form-control" placeholder="add comment" style={{"borderBottom": "1px solid","borderRadius":"0px"}}/></div><div className="col-lg-2"><button className="btn btn-dark"><FontAwesomeIcon icon={faPaperPlane} color="white" /></button></div></div>
                   
                   
                    
                    </div> */}
                </div>
        </div>
    }
}