import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth/userAuth';
import {read, update} from './apiUser'

class EditProfileUser extends Component {


    constructor(){
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            loading: false
        };
    }


    init = (userId) => {
        const token = isAuthenticated().token;
        fetch(`${process.env.REACT_APP_API_URL}/user/user/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.error){
                this.setState({ redirectToProfile: true })
                //console.log('ERROR FETCHING')
            }else{
                // console.log(data)
                this.setState({ id: data._id, name: data.name, email: data.email,  error: ""  })
            }
        })
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId);  
    }

    isvalid = () => {
        const {name, email, password, error} = this.state;
        if(name.length == 0){
            this.setState({ error: 'Name is required'})
            return false
        }

       if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({ error: 'Email is required/Wrong Format'})
            return false
        }
  
         if(password.length >=1 && password.length <= 5){
            this.setState({ error: 'Password must be at least 6 characters long'})
            return false
        }
        return true;
    }

    handleChange = (name) => (event) => {
        // this.setState({ error: "" });
        // const value = name === 'photo'  ? event.target.files[0] : event.target.value
        // this.userData.set(name, value)
        this.setState({ [name]:  event.target.value});
    }


    update = (userId, token, user, userData) => {
        console.log('user DATA: ', user)
        return fetch(`${process.env.REACT_APP_API_URL}/user/user/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            },
            body: JSON.stringify(user)     
            
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
    }

    clickSubmit = event => {
        event.preventDefault(); 
        this.setState({ loading: true })

        if(this.isvalid()){

            const {name, email, password, error} = this.state
            const user = { 
                name,
                email,
                password: password || undefined,
                error
            };
    
            //console.log(user)
    
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
    
            this.update(userId, token, user, error, this.userData)
            .then(data => {
                if(data.error){
                    this.setState({error: data.error})
                } else {
                    this.setState({
                        redirectToProfile: true
                    })
                }
            }) 
        }       
    }


    editForm = (name, email, password) => (
     
        <form>

            <div className="form-group">
                <label>User Name</label>
                <input onChange={this.handleChange('name')} value={name} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label>User Email</label>
                <input onChange={this.handleChange('email')} value={email}  type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={this.handleChange('password')} value={password} type="password" className="form-control"/>
            </div>


            <button onClick={this.clickSubmit} className="btn btn-raised btn-block" style={{backgroundColor: "rgb(234, 181, 178)"}}>Update</button>
        </form>
     
    )


    render(){
        const {name, email, password, redirectToProfile, id, error, loading} = this.state;

        if(redirectToProfile){
            return <Redirect to={`/dashboard-user/${id}`} />
        }    


        return (
            <div className = "container">
                <h2>Edit User Profile</h2>

             {/* ERROR MESSAGE **************************** */}
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {/* {this.state.error} */}
                 {error}
                </div>

                 {/* DISPLAY LOADING SPIN: **************************** */}
                 {loading ?
                    <div className="jumbotron text-center">
                    <h2>Loading......</h2>
                    </div> 
                    : ""
                }  


                {this.editForm(name, email, password)}

            </div>
        )
    }
}

export default EditProfileUser;