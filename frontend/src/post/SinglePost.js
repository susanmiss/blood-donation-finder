/** @format */

import React, { Component } from "react";
import DefaultAvatar from "../images/hospitalAvatar.png";
import { isAuthenticated } from "../auth/hospitalAuth";
import { Redirect, Link } from "react-router-dom";
import {like, unlike } from './apiPost'

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      redirectToProfile: false,
      redirectToSignIn: false,
      hospital: "",
      like: false,
      likes: 0
    };
  }

  checkLike = (likes) => {
    const userId = isAuthenticated && isAuthenticated().user._id
    //indexOf return -1 if not found
    let match = likes.indexOf(userId) !== -1;
    return match;
  }


  likeToggle = () => {
       if(!isAuthenticated()){
          this.setState({ redirectToSignIn: true})
          return false
        }
    let callApi = this.state.like ? unlike : like
    const userId = isAuthenticated().user._id
    const postId = this.state.post._id
    const token = isAuthenticated().token

    callApi(userId, token, postId).then(data =>{
      if(data.error){
        console.log(data.error)
      }else{
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        })
      }
    })
  }

  singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })

      .catch((err) => console.log(err));
  };

  remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  deleteConfirm = () => {
    let anwser = window.confirm("Are you sure you want to delete this post?");
    if (anwser) {
      this.deletePost();
    }
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    this.remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToProfile: true });
      }
    });
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    this.setState({ hospital: isAuthenticated().hospital });
    this.singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ 
          post: data, 
          likes: data.likes.length,
          like: this.checkLike(data.likes) });
      }
    });
  };

  render() {
    const { post, redirectToProfile, hospital , like, likes} = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/dashboard-hospital/${hospital._id}`} />;
    }

    return (
      <div className="card  m-5">
        {!post ? (
          <h2>No posts yet...</h2>
        ) : (
          <div className="card-body">
            <h2 className="card-title text-center">{post.title}</h2>
            <img
              src={DefaultAvatar}
              style={{ width: "100px" }}
              className="rounded mx-auto d-block"
            />
            <br />

            <h5 className="card-text text-center">
              {likes} Likes/Potencial Number of People going to Donate so far.
            </h5>


            <p className="card-text text-center">Message: {post.body}</p>

            <p className="card-text text-center">Quantity: {post.quantity}</p>
            <br />
            <p className="font-italic mt-3 text-center">
              Posted on {new Date(post.created).toDateString()}{" "}
            </p>

            <div className="row mb-1">
              {like ? 
              (<div className="col-md-6 mt-1">
              <Link
                to={`/post/${post._id}`}
                className="btn btn-outline-danger btn-block"
                onClick={this.likeToggle}
              >
                I can't donate now  💔 {" "}
              </Link>
            </div>) 
              : 
              (   <div className="col-md-6 mt-1">
              <Link
                to={`/post/${post._id}`}
                className="btn btn-danger btn-block"
                onClick={this.likeToggle}
              >
                I will Donate ❤ {" "}
              </Link>
            </div>)
              }


           

              <div className="col-md-6 mt-1">
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-danger btn-block"
                >
                  Chat Online/Send Email{" "}
                </Link>
              </div>
            </div>

            {isAuthenticated().hospital &&
              isAuthenticated().hospital._id === post.postedBy._id && (
                <div className="row mb-1">
                  <div className="col-md-6">
                    <Link
                      to={`/post/edit/${post._id}`}
                      className="btn btn-block btn-info "
                    >
                      Update Post
                    </Link>
                  </div>

                  <div className="col-md-6">
                    <button
                      onClick={this.deleteConfirm}
                      className="btn btn-block btn-dark"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default SinglePost;
