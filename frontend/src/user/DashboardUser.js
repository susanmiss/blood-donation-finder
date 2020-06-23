import React, {Component} from 'react';
import {isAuthenticated} from '../auth/hospitalAuth'
import {Redirect, Link} from 'react-router-dom'
import UserAvatar from '../images/avatar.png'
import DeleteUser from '../user/DeleteUser'
import FollowProfileButton from '../user/FollowProfileButton'
import { read } from "./apiUser";
import ProfileFollowersList from './ProfileFollowersList';
import AllPosts from '../post/AllPosts'

// export const isAuthenticated = () => {
//     if(typeof window == 'undefined'){
//         return false
//     }
//     if(localStorage.getItem('jwt')){
//         return JSON.parse(localStorage.getItem('jwt'))
//     }else{
//         return false
//     }
// }

class DasboardUser extends Component {
    constructor() {
        super()
        this.state = {
            user: {following: [], followers: []},
            redirectToSignIn: false,
            following: false,
            error: ""
        }
        
    }


   // check follow
   checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
 
      }
    });
  };

        componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId);   
        }

        componentWillReceiveProps(props) {
            const userId = props.match.params.userId;
            this.init(userId);
          }

    
   render(){

        const {redirectToSignIn, user} = this.state;
        if (redirectToSignIn) return <Redirect to="/signin-user" />


       return(

        

            <div className="container mt-5 text-center">
                <h1>Dashboard User</h1>
                <div className="row mt-5">
           
                <div className="col-md-6" >
                     <img src={UserAvatar} alt={user.name} style={{ width: '80%', heigh: '10vw'}} className="mb-2"/> 

                     {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id ? (

                        <div className="d-inline-block mt-5">

                                <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-info mr-2">
                                    Edit Profile
                                </Link> 

                              <DeleteUser userId={user._id} /> 
                        </div>        

                    ) :

                      // (<FollowProfileButton />)
                      // <p>{this.state.following ? 'following' : 'not following'}</p>
                      (<FollowProfileButton 
                      following={this.state.following} 
                      onButtonClick={this.clickFollowButton}
                      />)
                      }


                </div>

                <div className="col-md-6">
                    <h2>{`Welcome ${user.name}!`}</h2>
                    <p>{user.email}</p>
                    <p>Last time donation: 11/11/2020</p>
                    <p>You can donate again: 11/03/2021</p>
                    <p>*******  Barra the tempo *********</p>

                    <p>All Hospital Posts:</p>
                    
                  
                

            
               
            
           
            </div>   
        </div> 
        <hr />
            <ProfileFollowersList followers={this.state.user.followers} following={this.state.user.following} />  
       
        <AllPosts />    
    </div>    
 

       );
   }
}


export default DasboardUser;