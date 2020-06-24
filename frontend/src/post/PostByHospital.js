/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/hospitalAuth";
import DefaultAvatar from "../images/city-hospital.png";

class PostByHospital extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  listByHospital = (hospitalId) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/post/posts/by/${hospitalId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    const hospitalId = isAuthenticated().hospital._id;
    this.listByHospital(hospitalId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <div>
        <p className="text-center">Posts By Hospital</p>

        <div className="row mt-5 text-center ">
          {/* {JSON.stringify(users)} */}

          {posts.map((post, i) => {
            const posterId = post.postedBy ? post.postedBy._id : "";
            const posterName = post.postedBy
              ? post.postedBy.hospitalName
              : "Unknown";

            return (
              <div className="card col-md-12 m-3" key={i}>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <img
                    src={DefaultAvatar}
                    style={{ width: "50px" }}
                    className="float-right"
                  />
                  <p className="card-text float-left">Message: {post.body}</p>
                  <br />
                  <p className="card-text float-left">
                    Quantity: {post.quantity}
                  </p>
                  <br />
                  <p className="font-italic mt-3">
                    Posted by{" "}
                    <Link
                      to={`/dashboard-hospital/${posterId}`}
                      className="secondary"
                    >
                      {posterName}
                    </Link>{" "}
                    on {new Date(post.created).toDateString()}{" "}
                  </p>
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-secondary btn-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostByHospital;
