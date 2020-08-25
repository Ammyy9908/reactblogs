import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const CreatePost = (props)=>{
    if(localStorage.getItem('userData'))
    {

        function addPost(e){
            e.preventDefault();
            const form = e.target;
            const title = form.title.value;
            const description = form.description.value;
            const tags = form.tags.value;
            if(title.length===0 && description.length===0 && tags.length===0)
            {
                alert('Make sure to add title and description!')
            }else{
                const data = {title: title, description: description,tags:tags};
                axios.post(`https://desolate-reaches-85560.herokuapp.com/new/uid/${JSON.parse(localStorage.getItem('userData'))['uid']}`, data).then((response)=>{

                    if(response.status===200){
                            props.history.push("/reactblog/");
                    }
                }).catch((error)=>{
                    console.log(error);
                });
            }
        }

  
    return(<div>
        <div className="container-fluid mt-5">
	<div className="row">
	    
	    <div className="col-md-8 col-md-offset-2" style={{"maxWidth":"950px","margin":"auto","minHeight":"400px"}}>
	        
    		<h1 className="display-1">Create post</h1>
    		
    		<form method="POST" onSubmit={addPost}>
    		    
    		    <div className="form-group">
    		        <label>Title <span className="require">*</span></label>
    		        <input type="text" className="form-control" name="title" />
    		    </div>
    		    
    		    <div className="form-group">
    		        <label>Description <span className="require">*</span></label>
    		        <textarea rows="5" className="form-control" name="description" ></textarea>
    		    </div>

                <div className="form-group">
    		        <label>Tags <span className="require">*</span></label>
    		        <input type="text" className="form-control" name="tags" placeholder="Add appropriate tags" />
    		    </div>
    		    
    		    <div className="form-group">
    		        <button type="submit" className="btn btn-dark">
    		            Create
    		        </button>
    		        <Link className="btn btn-default" to="/profile">
    		            Cancel
    		        </Link>
    		    </div>
    		    
    		</form>
		</div>
		
	</div>
</div>
    </div>);
}
else{
    return (
        
        window.location = "/login"
        
      );
      
}
}



export default CreatePost;