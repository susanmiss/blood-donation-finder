import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import DefaultAvatar from '../images/hospitalAvatar.png';


class AllPosts extends Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    list = () => {
        return fetch(`${process.env.REACT_APP_API_URL}/post/posts`, { 
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.list()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({ posts: data });
            }
        })
    }

    render(){
        const {posts} = this.state;

        return(
        <div>
           <h2 className="text-center mt-5">All Posts</h2>
        
           <div className="row mt-5 text-center ">   
            {/* {JSON.stringify(users)} */}

            {posts.map((post, i) => {
                   const posterId = post.postedBy ? post.postedBy._id : "";
                   const posterName = post.postedBy ? post.postedBy.hospitalName : "Unknown";

               return (
                <div className="card col-md-12 m-3 bg-light" key={i}>
                
                    <div className="card-body">
                        <h3 className="card-title">{post.title}</h3>
                        <img src={DefaultAvatar}  style={{width: "100px", marginBottom: "20px"}}  className="rounded mx-auto d-block" />    
                        <p className="card-text float-left">Message: {post.body}</p>
                        <br/>
                 
                        <br />
                        <p className="font-italic mt-3">Blood Donation Requested by <Link to={`/dashboard-hospital/${posterId}`} style={{color: "rgb(234, 181, 178)"}}>{posterName}</Link> on {new Date(post.created).toDateString()}  </p>
             
                        <Link to={`/post/${post._id}`} className="btn btn-secondary btn-block">Read More</Link>
                        
                    </div>
                </div>)
            })}
            </div>
        </div>
        )
    }
}


export default AllPosts;