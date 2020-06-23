import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import SignupUser from "./user/SignupUser"
import SignupHospital from "./hospital/SignupHospital"
import SigninUser from "./user/SigninUser"
import SigninHospital from "./hospital/SigninHospital"
import Nav from "./core/Nav"
import Footer from "./core/Footer"
import About from "./core/About"
import WhoCanDonate from "./core/WhoCanDonate"
import DashboardUser from './user/DashboardUser'
import DashboardHospital from './hospital/DashboardHospital'
import EditProfileHospital from './hospital/EditProfileHospital'
import EditProfileUser from './user/EditProfileUser'
import AllHospitals from './hospital/AllHospitals'
import AllUsers from './user/AllUsers'
import PrivateRoute from './auth/PrivateRoute'
import ProfileFollowersList from './user/ProfileFollowersList'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'

const MainRouter = () => (
    <div>
        <Nav />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/who-can-donate" component={WhoCanDonate} />
            <Route exact path="/all-hospitals" component={AllHospitals} />
            <Route exact path="/all-users" component={AllUsers} />
            <Route exact path="/signup-user" component={SignupUser} />
            <Route exact path="/signup-hospital" component={SignupHospital} />
            <Route exact path="/signin-user" component={SigninUser} />
            <Route exact path="/signin-hospital" component={SigninHospital} />
            <Route exact path="/find-people" component={FindPeople} />
            <Route exact path="/dashboard-user/:userId" component={DashboardUser} />
            <Route exact path="/dashboard-hospital/:hospitalId" component={DashboardHospital} />
            <Route exact path="/hospital/edit/:hospitalId" component={EditProfileHospital} />
            <Route exact path="/user/edit/:userId" component={EditProfileUser} /> 
            <Route exact path="/user/profile-followers-list" component={ProfileFollowersList} />     
            <Route exact path="/find-people" component={FindPeople} />  
            <Route exact path="/post/create" component={NewPost} /> 
            <PrivateRoute exact path="/post/:postId" component={SinglePost} />   
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />     
        </Switch>
        <Footer />
    </div>
)

export default MainRouter;