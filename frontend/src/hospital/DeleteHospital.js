/** @format */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/hospitalAuth";

class DeleteHospital extends Component {
  state = {
    redirect: false,
  };

  remove = () => {
    const hospitalId = this.props.hospitalId;
    return fetch(
      `${process.env.REACT_APP_API_URL}/hospital/hospital/${hospitalId}`,
      {
        method: "DELETE",
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

  deleteAccount = () => {
    //console.log('Delete Account')
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    this.remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //signout hospital:
        signout(() => console.log("Hospital is deleted"));
        //redirect
        this.setState({ redirect: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your hospital/clinic account?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-dark"
      >
        Delete Hospital/Clinic
      </button>
    );
  }
}

export default DeleteHospital;

// import React, {Component} from 'react-router-dom'

// class DeleteHospital extends Component {
//     render(){
//         return (
//             <div>

//             </div>
//         )
//     }
// }

// export default DeleteHospital
