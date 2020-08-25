import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


export default class UserPost extends React.Component{

    removePost(e){
        let id=e.target.parentElement.children[0].value;
        axios.post(`https://desolate-reaches-85560.herokuapp.com/post/remove/`,{pid:id}).then((response)=>{
            if(response.status===200){
                alert('Post removed successfully');
            }
        }).catch((error)=>{
            console.log(error);
        })

        
    }
 
    render(){
        return <div>
            <div className="card mb-5">
                    <div className="card-body">
                        <h1 className="card-title">{this.props.title}</h1>
                        <p className="text-muted">{this.props.content}</p>
                        <span>Published at:</span><strong> {new Date(this.props.pubAt).toLocaleString()}</strong>
                        <i className="fa fa-like"/><p>  <FontAwesomeIcon icon={faHeart} color="red" /> {this.props.likes}</p>
                    <strong>Tags:</strong>{this.props.tags.map(tag =>tag+",")}<br/><br/>
                    <div>
                        <input type="hidden" value={this.props.id} id={this.props.id} />
                    <button className="btn btn-danger btn-sm ml-0" onClick={this.removePost}>Remove</button></div>
                    </div>
                </div>
        </div>
    }
}