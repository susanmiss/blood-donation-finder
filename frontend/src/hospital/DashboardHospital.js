/** @format */

import React, { Component } from "react";
import { isAuthenticated } from "../auth/hospitalAuth";
import { Redirect, Link } from "react-router-dom";
import HospitalAvatar from "../images/hospitalAvatar.png";
import DeleteHospital from "../hospital/DeleteHospital";
import FollowProfileButton from "../user/FollowProfileButton";
import PostByHospital from "../post/PostByHospital";

class DashboardHospital extends Component {
  constructor() {
    super();
    this.state = {
      hospital: "",
      redirectToSignIn: false,
      posts: [],
      following: false,
    };
  }

  // clickFollowButton = (callApi) => {
  //   if(!isAuthenticated()){
  //     this.setState({ redirectToSignIn: true})
  //     return false
  //   }

  //   const hospitalId = isAuthenticated().hospital._id;
  //   const token = isAuthenticated().token;

  //   callApi(hospitalId, token, this.state.hospital._id).then((data) => {
  //     if (data.error) {
  //       this.setState({ error: data.error });
  //     } else {
  //       this.setState({ hospital: data, following: !this.state.following });
  //     }
  //   });
  // };

  init = (hospitalId) => {
    fetch(`${process.env.REACT_APP_API_URL}/hospital/hospital/${hospitalId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignIn: true });
          //console.log('ERROR FETCHING')
        } else {
          // console.log(data)
          this.setState({ hospital: data });
        }
      });
  };

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

  componentDidMount() {
    // console.log('hospitaId from router params: ', this.props.match.params.hospitalId)
    const hospitalId = this.props.match.params.hospitalId;
    this.init(hospitalId);
    this.listByHospital(hospitalId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  //When change the user, it will receive propsfrom react-router-dom and will change and we will be able to see the correct profile
  componentWillReceiveProps(props) {
    const hospitalId = props.match.params.hospitalId;
    this.init(hospitalId);
  }

  render() {
    // const redirectToSignIn = this.state.redirectToSignIn
    const { redirectToSignIn, hospital, posts } = this.state;
    if (redirectToSignIn) return <Redirect to="/signin-hospital" />;

    return (
      <div className="container mt-5 text-center">
        <h1>Dashboard Hospital</h1>
        <div className="row mt-5">
          <div className="col-md-6">
            <img
              src={HospitalAvatar}
              alt={hospital.hospitalName}
              style={{ width: "80%", heigh: "10vw" }}
            />
          </div>

          <div className="col-md-6">
            <h2>{`Welcome ${hospital.hospitalName}!`}</h2>
            <p>{`Joined  ${new Date(
              this.state.hospital.created
            ).toDateString()}`}</p>
            <p>Email: {hospital.hospitalEmail} </p>
            <p>Hospital/Clinic Address: {this.state.hospital.address} </p>
            <p>Contact Person: {this.state.hospital.personName} </p>
            <p>Contact Person Email: {this.state.hospital.personEmail} </p>

            {isAuthenticated().hospital &&
            isAuthenticated().hospital._id === this.state.hospital._id ? (
              <>
                <div className="row">
                  <div className="col-md-12">
                    <Link
                      to={`/post/create`}
                      className="btn btn-block btn-outline-danger mb-1"
                    >
                      Create Post
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Link
                      to={`/hospital/edit/${hospital._id}`}
                      className="btn  btn-info btn-block mr-5"
                    >
                      Edit Profile
                    </Link>
                  </div>

                  <div className="col-md-6 btn-block">
                    <DeleteHospital hospitalId={hospital._id} />
                  </div>
                </div>
              </>
            ) : (
              // <FollowProfileButton
              //   following={this.state.following}
              //   onButtonClick={this.clickFollowButton}
              // />
              ""
            )}
          </div>

          <div className="col-md-12">
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
                      src={HospitalAvatar}
                      style={{ width: "50px" }}
                      className="rounded mx-auto d-block"
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
                        style={{ color: "rgb(234, 181, 178)" }}
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
      </div>
    );
  }
}

export default DashboardHospital;
