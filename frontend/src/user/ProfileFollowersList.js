/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/avatar.png";

class ProfileFollowersList extends Component {
  render() {
    const { following, followers } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="mb-4">Followers:</h3>
            {/* {JSON.stringify(followers)} */}
            {followers.map((person, i) => (
              <div key={i}>
                <div className="row">
                  <div className="col-md-12">
                    <Link to={`/user/${person._id}`}>
                      <img
                        src={Avatar}
                        className="float-left mb-2 mr-2"
                        alt={person.name}
                        style={{ width: "40px" }}
                      />
                      <p style={{ textAlign: "left" }}>{person.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            {/* {JSON.stringify(followers)} */}
            <h3 className="mb-4">Following:</h3>
            {/* {JSON.stringify(followers)} */}
            {following.map((person, i) => (
              <div key={i}>
                <div className="row">
                  <div className="col-md-12">
                    <Link to={`/dashboard-user/${person._id}`}>
                      <img
                        className="float-left mb-2 mr-2"
                        src={Avatar}
                        alt={person.name}
                        style={{ width: "40px" }}
                      />
                      <p style={{ textAlign: "left" }}>{person.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default ProfileFollowersList;
