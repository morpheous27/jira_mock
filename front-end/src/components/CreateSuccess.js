import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira, updateJira } from './UserFunctions'
import { fetchJiraDetails, fetchAllUsers } from './UserFunctions'
import { Accordion, Alert, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class CreateSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operationStatus:'',
      user_mail:'',
      jid:'',
      user_name:'',
      first_name:'',
      last_name:'',
      title:'',
      description:'',
      is_active:'',
      status:'',
      report_date:'',
      assigned_to:'',
      user_mails: []
    }
  }

  componentDidMount() {
    const operationStatus = sessionStorage.getItem('operationStatus')
    this.isAuth = sessionStorage.getItem('isAuth')
    this.setState({
      operationStatus: operationStatus
    })

   
  }

  render() {
    if (this.isAuth == undefined || this.isAuth == false) {
      return <div className="container">
        <br></br>
        <Alert variant="info">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            You need to Sign In/Register first to load your profile.
      </p>
          <hr />
        </Alert>
      </div>
    }
    else if(this.state.operationStatus === 'success')
    {
      console.log('update operation success')
      return <div className="container">
      <br></br>
      <Alert variant="info">
        <Alert.Heading>Issue logged successfully.</Alert.Heading>
        <a href="/home">Click to go back to Home</a>
      </Alert>
    </div>
    }
  }
}

export default CreateSuccess;