/** @format */

import React, { Component } from "react";
import {comment, uncomment} from './apiPost'
import {isAuthenticated} from '../auth/userAuth'
import {Link} from 'react-router-dom'
import Avatar from '../images/avatar.png'

class Comment extends Component {
  state = {
    text: "",
    error: ""
  };

  isValid = () => {
      const {text} = this.state
      if(text.length <= 0 || text.length > 150){
          this.setState({error: "Comment should not be empty and less the 150 characters"});
          return false;
      }
      return true;
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    });
    this.setState({
        error: ""
      });
  };


  addCommment = (event) => {
    event.preventDefault();

    if(!isAuthenticated()){
        this.setState({ error: "Please sign in to leave  a comment"})
        return false
    }

    if(this.isValid()) {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        const postId = this.props.postId
    

        comment(userId, token, postId, {text: this.state.text})
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                this.setState({text: ''})
            //pass this comment  listto Parent Component Single Post????????
            //check updateComments is send as props to Comment and will receive back !!!!!!!
            this.props.updateComments(data.comments)
        }
      })
    }
  }

  deleteConfirm = (comment) => {
    let anwser = window.confirm("Are you sure you want to delete this comment?");
    if (anwser) {
      this.deleteComment(comment);
    }
  };

  deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        const postId = this.props.postId

        uncomment(userId, token, postId, comment)
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else{
            this.props.updateComments(data.comments)
        }
      })
  };

  render() {
      const {comments} = this.props
      const {error} = this.state
    return (
      <div className="container m-5">
        <hr />
        <h5 className="text-danger">Leave a Comment</h5>
       
        <form onSubmit={this.addCommment} className="mb-5">
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.text}
              placeholder="Leave a comment..."
            />
            <button className="btn btn-danger btn-sm mt-2">Comment</button>
          </div>
        </form>
        {/* {JSON.stringify(this.props.comments)} */}
       

        <div className="dark alert-dark"
        style={{ display: error ? "" : "none"}}>
            {error}
        </div>
        <hr />

        <div>

        <h3 className="mb-5 mt-5" style={{color: "darkred"}}>{comments.length} Comments</h3>

            {comments.map((comment, i) => (
              <div key={i}>
                <div className="row">
                  <div >
                    <Link to={`/dashboard-user/${comment.postedBy._id}`}>
                      <img
                        className="float-left mb-2 mr-2"
                        src={Avatar}
                        alt={comment.name}
                        style={{ width: "40px" }}
                      />
                     
                    </Link>
                    <p style={{ textAlign: "left" }}>{comment.text}</p>
                    <br />
                    <p className="font-italic mark mt-3  ">
                          Posted By{" "}   
                          <Link to="/dashboard-user/${comment.postedBy._id}"> {comment.postedBy.name} </Link>
                          
                          on {" "}  
                          {new Date(comment.created).toDateString()}
                    <span>

                        {isAuthenticated().user &&
                            isAuthenticated().user._id === comment.postedBy._id && (
                    

                               
                                    <button
                                    onClick={() => this.deleteConfirm(comment)}
                                    className="btn btn-sm btn-dark ml-5"
                                    >
                                    Delete Comment
                                    </button>
                         
                        
                            )}
                
                        
                        
                    </span>      
                     </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

      </div>

     
    );
  }
}

export default Comment;
