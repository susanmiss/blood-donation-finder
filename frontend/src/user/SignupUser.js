import React, {Component} from 'react'
// import {signup} from "../auth/userAuth";
// import SigninUser from '../user/SigninUser'
import {Link} from 'react-router-dom'

class SignupUser extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            success: false
        }
    }

    handleChange = (name) => (event) => {
        //Another option setState to each input
        //Bellow, to clean the error message when the user start to type some new infon to fix the error:
        this.setState({error: ""})
        this.setState({ [name] : event.target.value })
        //console.log(this.state) - check in reactComponents devTools
    }

    clickSubmit = event => {
        event.preventDefault(); //not reload the page
        const {name, email, password} = this.state
        const user = { //create a new user
            name: name,
            email: email,
            password: password
        };
        //console.log(user)

        
        this.signup(user)
        //If we have error, populate the state with that error and display to the user:
        .then(data => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }
        })      
    }

    signup = (user) => {
        return fetch(`http://localhost:8000/api/auth/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err=> console.log(err));
    }

    signupForm = (name, email, password) => (
        <form>
            <div>
                <label>Name</label>
                <input onChange={this.handleChange("name")} value={name} type="text" className="form-control"/>
            </div>

            <div>
                <label>Email</label>
                <input onChange={this.handleChange("email")} value={email} type="email" className="form-control"/>
            </div>

            <div>
                <label>Password</label>
                <input onChange={this.handleChange("password")}  value={password} type="password" className="form-control"/>
            </div>
            <br />
            <button onClick={this.clickSubmit} style={{backgroundColor: "rgb(234, 181, 178)"}} className="btn btn-raised btn-block">SignUp</button>
        </form>
    )



    render(){
        const {name, email, password, error, success} =  this.state

        return (
            <div className="container">
           
                    <h1>SignUp User</h1>

                   
            

                {/* DISPLAY MESSAGE ERROR / SSUCCESS: ********************************* */}

                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {/* {this.state.error} */}
                    {error}
                </div>

                <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                    {/* {this.state.error} */}
                    New account is successfully created.
                    <Link className="text-center" to="/signin-user"> Please login HERE.</Link>
                    {/* <SigninUser /> */}
                </div>


                {this.signupForm(name, email, password)}
                
                
            </div>
        )
    }
}


export default SignupUser;