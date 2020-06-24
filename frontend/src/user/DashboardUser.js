/** @format */

import React, { Component } from "react";
import { isAuthenticated } from "../auth/hospitalAuth";
import { Redirect, Link } from "react-router-dom";
import UserAvatar from "../images/avatar.png";
import DeleteUser from "../user/DeleteUser";
import FollowProfileButton from "../user/FollowProfileButton";
import { read } from "./apiUser";
import ProfileFollowersList from "./ProfileFollowersList";
import AllPosts from "../post/AllPosts";

class DasboardUser extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignIn: false,
      following: false,
      error: "",
      days: 56,
      nextDate: "",
      lastTimeDonation: ''
    };
  }

  addDay = () => {
    const days = this.state.days
    this.setState({ days: days + 2 })
  }

  addDate = () => {
    const nextDate = this.state.user.lastTimeDonation
    this.setState({
      lastTimeDonation: this.state.user.lastTimeDonation
    })

  }

  componentWillMount(){
    // this.addDay();
    this.addDate();
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
    
  }

  // check follow
  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
      }
    });
  };

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignIn, user, nextTimeDonation } = this.state;
    if (redirectToSignIn) return <Redirect to="/signin-user" />;

    return (
      <div className="container mt-5 text-center">
        <h1>Dashboard User</h1>
        <div className="row mt-5">
          {/* {JSON.stringify(user)} */}

          <div className="col-md-6">
            <img
              src={UserAvatar}
              alt={user.name}
              style={{ width: "80%", heigh: "10vw" }}
              className="mb-2"
            />

            {isAuthenticated().user &&
            isAuthenticated().user._id === this.state.user._id ? (
              <div className="d-inline-block mt-5">
                <Link
                  to={`/user/edit/${user._id}`}
                  className="btn btn-raised btn-info mr-2"
                >
                  Edit Profile
                </Link>

                <DeleteUser userId={user._id} />
              </div>
            ) : (
              // (<FollowProfileButton />)
              // <p>{this.state.following ? 'following' : 'not following'}</p>
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>

          <div className="col-md-6">
            <h2>{`Welcome ${user.name}!`}</h2>
            <p>
              Blood Type:{" "}
              <span style={{ fontSize: "30px" }}>{user.bloodType}</span>
            </p>
            <p>{user.email}</p>
            <p>
              Last time donation:{" "}
              {new Date(user.lastTimeDonation).toDateString()}
            </p>
            <p>
              Next Time to Donate:{" "}
              {/* {this.addDate} */}
              {/* {this.state.days} */}
              {/* {this.state.user.lastTimeDonation} */}
              {this.state.nextDate}
            </p>

          
            <p>{`You can donate again in ${nextTimeDonation} days! `}</p>
            <div class="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "80%" }}
              >
                <span className="sr-only">80% Complete </span>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <ProfileFollowersList
          followers={this.state.user.followers}
          following={this.state.user.following}
        />

        <AllPosts />
      </div>
    );
  }
}

export default DasboardUser;
