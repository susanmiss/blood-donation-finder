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
      days: "",
      nextDate: "",
      open: false,
    };
  }




  addDay = () => {
    let startDate = new Date();
    let endDate   = new Date(this.state.nextDate);
    let timeDiff  = (new Date(startDate)) - (new Date(endDate));
    const days    = parseInt(timeDiff / (1000 * 60 * 60 * 24))
    console.log("Days " +  days)
    // alert(days)
    if( days <= 0 ){
       let newDay =  Math.abs(days)
      console.log(` You still need to wait ${newDay} days to donate again.` )
    }else{
      console.log(`You already can donate. Have been more than 60 days since your last donation`)
    }
    this.setState({
      days: Math.abs(days)
    })
  
  };




 addDate = () => {
  let nextDate = new Date(this.state.user.lastTimeDonation);
  nextDate.setMonth(nextDate.getMonth() + 2);
  this.setState({
        nextDate: nextDate,
        open: true
      });
  };

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
    const { redirectToSignIn, user, nextDate, open, days } = this.state;
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

         

             <button onClick={this.addDate} className="btn btn-danger">
              Check next Date you can donate again!
            </button>
            <br />

            {open ? (
              <p className="text-warning mt-5">
                You can donate again in {new Date(nextDate).toDateString()}{" "}
                <button className="btn btn-outline-danger mt-5" onClick={this.addDay}>Click here to check how many days left to Donate again: </button>
                <span style={{fontSize: "30px"}}>{days}</span>

              </p>
            ) : (
              ""
            )} 
            
           
        
            <br />

            {/* <div class="progress">
              <div
                className="progress-bar progress-bar-success progress-bar-striped"
                role="progressbar"
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "80%" }}
              >
                <span> % </span>
              </div>
            </div> */}
            {/* <p>{`${days} days left for you be able to donate again `}</p> */}
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
