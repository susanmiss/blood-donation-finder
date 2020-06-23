import React, {Component} from 'react'
import DefaultAvatar from '../images/hospitalAvatar.png';
import {isAuthenticated} from '../auth/hospitalAuth'
import {Redirect, Link} from 'react-router-dom'

class SinglePost extends Component {
        constructor(){
            super()
            this.state = {
                post: '',
                redirectToProfile: false,
                hospital: '',
                post: ''

            }
        }

        singlePost = (postId) => {
            return fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, { 
                method: 'GET'
            })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
        }

         remove = (postId, token) => {
            return fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };

        deleteConfirm = () => {
            let anwser = window.confirm(
                'Are you sure you want to delete this post?'
            );
            if (anwser){
                this.deletePost()
            }
        
        }

        deletePost = () => {
            const postId = this.props.match.params.postId
            const token = isAuthenticated().token
            this.remove(postId, token)
                .then(data => {
                    if(data.error){
                        console.log(data.error)
                    } else{
                        this.setState({ redirectToProfile: true})
                    }
                })
        }

        componentDidMount = () => {
            const postId = this.props.match.params.postId
            this.setState({ hospital: isAuthenticated().hospital });
            this.singlePost(postId)
            .then(data => {
                if(data.error){
                    console.log(data.error);
                }else{
                    this.setState({ post: data });
                }
            })
        }

        render(){
            const {post, redirectToProfile, hospital} = this.state;

            if (redirectToProfile) {
                return <Redirect to={`/dashboard-hospital/${hospital._id}`} />;
            }

            return(
                <div className="card  m-5" >

                    {!post ? ( 
                        <h2>No posts yet...</h2>
                    ) : (
                        <div className="card-body">
                        <h2 className="card-title text-center">{post.title}</h2>
                        <img src={DefaultAvatar}  style={{width: "100px"}}  className="rounded mx-auto d-block"/>  
                        <br />
                        <p className="card-text text-center">Message: {post.body}</p>
                   
                        <p className="card-text text-center">Quantity: {post.quantity}</p>
                        <br />
                        <p className="font-italic mt-3 text-center">Posted on {new Date(post.created).toDateString()}  </p>
                      
                        {isAuthenticated().hospital && isAuthenticated().hospital._id === post.postedBy._id &&

                           <> 
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-info mr-2">
                                 Update Post
                            </Link>
                            
                            <button onClick={this.deleteConfirm} className="btn btn-raised btn-dark">
                                Delete Post
                            </button>
                            </>
                    }
                    
                    </div>
                    )}
                
                
            </div>
            )
         }
    }
  


export default SinglePost;