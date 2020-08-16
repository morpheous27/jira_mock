import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira } from './UserFunctions'
import { fetchJiraDetails } from './UserFunctions'
import { Accordion, Alert, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class Ticket extends Component {
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
      jiras: {}
    }
  }

  componentDidMount() {
    const ticket_id = sessionStorage.getItem('currentTicket')
    this.isAuth = sessionStorage.getItem('isAuth')

    fetchJiraDetails(ticket_id).then(res => {
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
    })
  }

  render() {
    if (this.isAuth == undefined || this.isAuth == false) {
      return <div classs="container">
        <Alert variant="info">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            You need to Sign In/Register first to load your profile.
      </p>
          <hr />
        </Alert>
      </div>
    }
    return (
      <div>
        <div style="height: 100px; background-color: rgba(255,0,0,0.1);">
          <div class="h-25 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 25%</div>
          <div class="h-50 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 50%</div>
          <div class="h-75 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 75%</div>
          <div class="h-100 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 100%</div>
          <div class="h-auto d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height auto</div>
        </div>
        <div class="container-fluid" style={{ 'border': 'dashed' }}>
          <div class="ag-theme-alpine">
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Ticket Id</Form.Label>
                <Form.Control type="email" value={this.state.jiras.jid} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={this.state.jiras.title} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Problem description</Form.Label>
                <Form.Control as="textarea" rows="3" value={this.state.jiras.description} />
              </Form.Group>
            </Form>
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}>
            </AgGridReact>
          </div>
        </div>
      </div>

    );
  }
}

export default Ticket;