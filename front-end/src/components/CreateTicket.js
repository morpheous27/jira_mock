import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira } from './UserFunctions'
import { fetchJiraDetails } from './UserFunctions'
import { Accordion, Alert, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Comment", field: "comment"
      }, {
        headerName: "Added_by", field: "added_by"
      }, {
        headerName: "Comment add date", field: "add_date"
      }
      ],
      rowData: null,
      jiras: {},
      isAuth:false
    }
  }

  componentDidMount() {
    const ticket_id = sessionStorage.getItem('currentTicket')
    this.isAuth = sessionStorage.getItem('isAuth')
    console.log('ticket_id to load' + this.isAuth)
    this.setState({
      isAuth: sessionStorage.getItem('isAuth')
    })
    /* fetchJiraDetails(ticket_id).then(res => {
      if (res) {
        console.log('ticket_id to load' + (res))
        this.setState({
          jiras: res.jiras,
          rowData: res.jiras.comment
        })
        this.render()
      }
    }).catch((err) => {
      console.log('error- ' + err)
    }) */
  }

  render() {
    console.log('this.isAuth'+this.isAuth)
    if (this.isAuth == undefined || this.isAuth == false) {
      return <Alert variant="info">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          You need to Sign In/Register first to load your profile.
      </p>
        <hr />
      </Alert>
    }
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
      </Button>
      </Form>

    );
  }
}

export default CreateTicket;