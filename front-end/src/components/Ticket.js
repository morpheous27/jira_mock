import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira, updateJira } from './UserFunctions'
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
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const jira = {
      jid: this.state.jid,
      user_name:this.state.user_name,
      title:this.state.title,
      description:this.state.description,
      status:this.state.status,
      assigned_to:this.state.assigned_to,
      report_date:this.state.report_date
    }
    updateJira(jira).then(res => {
      console.log('jira updated successfully')
    }).catch(err => {
      console.log('Error occurred at  - ' + err)
    })


  }

  onChange(e) {
    console.log('state changed'+ e.target.value)
    this.setState({ [e.target.name]: e.target.value })
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
          jid:res.jiras.jid,
          user_name:res.jiras.user_name,
          first_name:res.jiras.first_name,
          last_name:res.jiras.last_name,
          title:res.jiras.title,
          description:res.jiras.description,
          is_active:res.jiras.is_active,
          status:res.jiras.status,
          report_date:res.jiras.report_date,
          assigned_to:res.jiras.assigned_to,
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
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="formTicketId">
                    <Form.Label>TicketId</Form.Label>
                    <Form.Control type="text" readOnly defaultValue={this.state.jid} />
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.onChange} name="title" defaultValue={this.state.title} />
                  </Form.Group>
                  <Form.Group controlId="formDesc">
                    <Form.Label>Problem Description</Form.Label>
                    <Form.Control as="textarea" onChange={this.onChange} name="description" rows="4" defaultValue={this.state.description} />
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" onChange={this.onChange} name="status" defaultValue={this.state.status} />
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Current owner</Form.Label>
                    <Form.Control type="text" readOnly defaultValue={this.state.assigned_to} />
                  </Form.Group>
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control as="select" onChange={this.onChange} name="assigned_to" defaultValue={this.state.assigned_to}>
                    {this.state.user_mails.map((e, key) => {
                      if (e === this.state.assigned_to) {
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