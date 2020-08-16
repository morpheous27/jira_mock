import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira } from './UserFunctions'
import { fetchJiraDetails, fetchAllUsers } from './UserFunctions'
import { Accordion, Alert, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Comment", field: "comment", width: 100
      }, {
        headerName: "Added_by", field: "added_by"
      }, {
        headerName: "Comment add date", field: "add_date"
      }
      ],
      rowData: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true
    },
      jiras: {},
      user_mails: []
    }
  }

  componentDidMount() {
    const ticket_id = sessionStorage.getItem('currentTicket')
    this.isAuth = sessionStorage.getItem('isAuth')
    // fetch all users
    fetchAllUsers().then(res => {
      if (res) {
        this.setState({
          user_mails: res.users.map(u => u.user_mail)
        })
      }
    })

    // fetch all jira details
    fetchJiraDetails(ticket_id).then(res => {
      if (res) {
        console.log('ticket_id to load' + (res))
        this.setState({
          jiras: res.jiras,
          rowData: res.jiras.comment
        })
      }
    }).catch((err) => {
      console.log('error- ' + err)
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
    return (
      <div className="h-auto w-100">
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Issue Description
      </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form.Group controlId="formTicketId">
                    <Form.Label>TicketId</Form.Label>
                    <Form.Control type="text" defaultValue={this.state.jiras.jid} />
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" defaultValue={this.state.jiras.title} />
                  </Form.Group>
                  <Form.Group controlId="formDesc">
                    <Form.Label>Problem Description</Form.Label>
                    <Form.Control as="textarea" rows="4" defaultValue={this.state.jiras.description} />
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" defaultValue={this.state.jiras.status} />
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Current owner</Form.Label>
                    <Form.Control type="text" defaultValue={this.state.jiras.assigned_to} />
                  </Form.Group>
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control as="select" name="assign to" defaultValue={this.state.jiras.assigned_to}>
                    {this.state.user_mails.map((e, key) => {
                      if (e === this.state.jiras.assigned_to) {
                        return <option key={key} value={e} selected>{e}</option>;
                      } else {
                        return <option key={key} value={e}>{e}</option>;
                      }
                    })}

                  </Form.Control>
                  <br></br>
                  <Form.Label>Comments</Form.Label>
                  <div className="ag-theme-alpine w-65" style={{ height: '200px' }}>
                    <AgGridReact
                      columnDefs={this.state.columnDefs}
                      rowData={this.state.rowData} defaultColDef={this.state.defaultColDef}> 
                    </AgGridReact>
                  </div>
                  <br></br>

                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form>

              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Ticket;