import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchAllUsers, createJira } from './UserFunctions'
import { Accordion, Alert, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class CreateTicket extends Component {
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
      rowData: '',
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
      report_date: new Date()
    }
    createJira(jira).then(res => {
      console.log('jira updated successfully'+res.data)
      sessionStorage.setItem('operationStatus', 'success')
      this.props.history.push('/createSuccess')
    }).catch(err => {
      console.log('Error occurred at  - ' + err)
    })


  }

  onChange(e) {
    console.log('state changed'+ e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }



  componentDidMount() {
    this.isAuth = sessionStorage.getItem('isAuth')
    sessionStorage.setItem('operationStatus', '')
    // fetch all users
    fetchAllUsers().then(res => {
      if (res) {
        this.setState({
          user_mails: res.users.map(u => u.user_mail)
        })
      }
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
                  <Button variant="primary" type="submit">
                    Create
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

export default CreateTicket;