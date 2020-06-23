import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import AvatarHospital from '../images/city-hospital.png'


class AllHospitals extends Component {
    constructor(){
        super()
        this.state = {
            hospitals: []
        }
    }

    list = () => {
        return fetch(`${process.env.REACT_APP_API_URL}/hospital/hospitals`, { 
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.list()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({ hospitals: data });
            }
        })
    }


    render(){
        const {hospitals} = this.state;
        return(
        <div className="container mt-5 text-center">
           <p>All Hospitals - List</p>
            {/* {JSON.stringify(hospitals)} */}

            <div className="row mt-5 text-center ">
            {hospitals.map((hospital, i) => (

                   <div className="card col-md-4" key={i}>
                   <img src={AvatarHospital} className="card-img-top" alt="..." style={{ width: '100%', heigh: '15vw',  objectFit: 'cover' }} />
                   <div className="card-body">
                   <h5 className="card-title">{hospital.hospitalName}</h5>
                       <p className="card-text">{hospital.address}</p>
                       <Link to={`/dashboard-hospital/${hospital._id}`} className="btn btn-danger">View Profile</Link>
                   </div>
               </div>

            ))}
            </div>
        </div>
        )
    }
}


export default AllHospitals;