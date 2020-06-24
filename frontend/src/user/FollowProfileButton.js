/** @format */

import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div>
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className="btn btn-secondary btn-raised btn-block mr-2"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.unfollowClick}
            className="btn btn-outline-secondary btn-block btn-raised"
          >
            UnFollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
