import React, { Component } from "react";
import {isAuthenticated} from '../auth/hospitalAuth'
import { Link } from "react-router-dom";


class AllAppointments extends Component {
  constructor() {
    super();
    this.state = {
      appointments: []
  
    };
  }

  deleteAppointment(){
      alert('Appointment Deleted')
  }

  list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/hospital/appointments`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


  componentDidMount = () => {
    this.list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ appointments: data });
      }
    });
  };

  render() {
    const { appointments } = this.state;
    return (
      <div className="container mt-5 text-center">
        <h2>All Appointments Booked</h2>
        {/* {JSON.stringify(appointments)} */}

        
        <div className="row mt-5 text-center ">
          {appointments.map((appointment, i) => (
            <div className="card col-md-4" key={i}>
             
              <div className="card-body">

              <button className="btn btn-block btn-dark" onClick={this.deleteAppointment}>Cancel Appointment</button>

                <h3 className="card-title mt-3">Slot Date: 
                <p>{appointment.slots.slot_date}</p></h3>
                <p className="card-title">Slot Time: {appointment.slots.slot_time}</p>
                <h5 className="card-title">{appointment.name}</h5>
                <p className="card-title">{appointment.email}</p>
                <p className="card-title">{appointment.phone}</p>
               
                
             
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}



export default AllAppointments;