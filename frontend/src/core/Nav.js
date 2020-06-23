import React from 'react';
import {Link, withRouter } from 'react-router-dom';
import Logo from '../images/agua.png'
// import { isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "black"}
        else return {color: "white"}
}

export const signout = (next) => {
    if(typeof window !== "undefined")
        localStorage.removeItem("jwt")
        next()
        return fetch(`http://localhost:8000/api/auth/signout`, {
            method: 'GET'
        })
        .then((response) => {
            console.log('signout', response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}


const Nav = ({history}) => (
    <div className="mb-5">
        <nav className="navbar navbar-expand-lg bg-danger" >
            <img src={Logo} style={{width: "50px", marginRight: "10px"}}/>
            <Link className="navbar-brand mr-5" to="/" style={{fontSize: "30px", color: "white"}}>Blood Donation</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">

                {/* <Link className="nav-item nav-link mr-auto" to="/" style={isActive(history,"/" )}>Home</Link> */}

                <Link className="nav-item nav-link" to="/all-hospitals" style={isActive(history,"/all-hospitals" )}>Hospitals</Link>

                <Link className="nav-item nav-link" to="/who-can-donate" style={isActive(history,"/who-can-donate" )}>Who Can Donate?</Link>

                {/* <Link className="nav-item nav-link " to="/about" style={isActive(history,"/about" )}>About</Link> */}

               
                 {/* Use a not Link becaouse we are  not trying to navigate the iuser to any other component */}

                 {/* CONDICIONAL: to display signout just when is logged In */}

                {isAuthenticated() && (
                         <>
                            {/* <Link className="nav-item nav-link"
                            to={`/user/${isAuthenticated().user._id}`} 
                            style={isActive(history,`/user/${isAuthenticated().user._id}`)}>
                                My USER Profile</Link>

                            <Link className="nav-item nav-link" to={`/hospital/${isAuthenticated().hospital._id} `}style={isActive(history,`/hospital/${isAuthenticated().hospital._id} ` )}>My HOSPITAL Profile</Link> */}
                             <Link className="nav-item nav-link" to="/find-people" style={isActive(history,"/find-people" )}>Find People to Follow</Link>

                             <Link className="nav-item nav-link" to="/post/create" style={isActive(history,"/post/create" )}>Create Post</Link>

                            <Link className="nav-item nav-link" to="/all-users" style={isActive(history,"/all-users" )}>All Users</Link>
          
                            <Link to="" onClick={() => signout(() => history.push('/'))} className="nav-item nav-link" style={{cursor: 'pointer', color: "darkred"}}>SignOut</Link>

                           

                        </>                       
        
                )}
                       
                </div>

            </div>

        </nav>
      {/* {JSON.stringify(props.history)} */}

    </div>
)


export default withRouter(Nav);