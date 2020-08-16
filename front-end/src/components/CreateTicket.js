import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira } from './UserFunctions'
import { fetchJiraDetails, fetchAllUsers } from './UserFunctions'
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
    this.isAuth = sessionStorage.getItem('isAuth')
    console.log('auth-'+this.isAuth)
    this.render()
  }

  render() {
    
    return (
      <div className="h-auto w-100">
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Log new Issue      </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" defaultValue={this.state.jiras.title} />
                  </Form.Group>
                  <Form.Group controlId="formDesc">
                    <Form.Label>Problem Description</Form.Label>
                    <Form.Control as="textarea" rows="4" defaultValue={this.state.jiras.description} />
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