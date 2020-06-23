import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthenticated, signout} from '../auth/userAuth'


class DeleteUser extends Component {

    state = {
        redirect: false
    }

    remove = () => {
        const userId = this.props.userId
         return fetch(`${process.env.REACT_APP_API_URL}/user/user/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    deleteAccount = () => {
        //console.log('Delete Account')
        const token = isAuthenticated().token;
        const userId = this.props.userId
        this.remove(userId, token)
        .then(data => {
          if(data.error){
              console.log(data.error)
          }else{
              //signout user
              signout(() => console.log('User is deleted'))
              //redirect
              this.setState({redirect: true});

          }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your account?')
        if(answer){
            this.deleteAccount()
        }
    }


    render(){
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return (
           
                 <button onClick={this.deleteConfirmed} className="btn btn-raised btn-dark">
                    Delete User
                </button> 
           
        )
    }
}

export default DeleteUser