/** @format */

import React, { Component } from "react";
import { isAuthenticated } from "../auth/hospitalAuth";
// import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      quantity: "",
      error: "",
      hospital: "",
      loading: false,
      fileSize: "",
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.setState({ hospital: isAuthenticated().hospital });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  create = (hospitalId, token, post) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/post/post/new/${hospitalId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`,
        },
        body: JSON.stringify(post),
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  isValid = () => {
    const { title, body } = this.state;

    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const { title, body, quantity, error } = this.state;
      const post = {
        title,
        body,
        quantity,
        error,
      };

      console.log(post);

      const hospitalId = isAuthenticated().hospital._id;
      const token = isAuthenticated().token;

      this.create(hospitalId, token, post).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            quantity: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };

  newPostForm = (title, body, quantity) => (
    <form>
      <div className="form-group">
        <label>Title</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>

      <div className="form-group">
        <label>Body</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <textarea
          onChange={this.handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-block"
        style={{ backgroundColor: "rgb(234, 181, 178)" }}
      >
        Create Post
      </button>
    </form>
  );

  render() {
    const {
      title,
      body,
      quantity,
      hospital,
      error,
      loading,
      redirectToProfile,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/dashboard-hospital/${hospital._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a new post</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        {this.newPostForm(title, body, quantity)}
      </div>
    );
  }
}

export default NewPost;
