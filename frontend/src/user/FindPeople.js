/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultAvatar from "../images/avatar.png";
import { findPeople } from "../user/apiUser";
import { isAuthenticated } from "../auth/userAuth";

class FindPeole extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount = () => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <h2 className="text-center">Find Your Friends Here</h2>

        <div className="row mt-5 text-center ">
          {/* {JSON.stringify(users)} */}

          {users.map((user, i) => (
            <div className="card col-md-3 ml-5" key={i}>
              <img
                src={DefaultAvatar}
                className="card-img-top"
                alt="..."
                style={{ width: "100%", heigh: "15vw", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link
                  to={`/dashboard-user/${user._id}`}
                  className="btn btn-danger"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FindPeole;
