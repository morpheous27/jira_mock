import React, { Component } from 'react';
import './../App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchUserJira } from './UserFunctions'
import { Accordion, Card, Navbar, Nav, NavDropdown, Form, FormControl, Button, Alert } from 'react-bootstrap'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Ticket Id", field: "jid", cellRenderer: (params) => {
          var link = document.createElement('a');
          link.href = '/ticket';
          link.innerText = params.value;
          link.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('currentTicket', params.value)
            this.props.history.push('/ticket')
            console.log(params.value);
          });
          return link;
        }
      }, {
        headerName: "Title", field: "title"
      }, {
        headerName: "Description", field: "description"
      },
      {
        headerName: "Assigned to", field: "assigned_to"
      },
      {
        headerName: "Report Date", field: "report_date"
      },
      {
        headerName: "Status", field: "status"
      }],
      rowData: null
    },

      this.user_mail = sessionStorage.getItem('user_mail');
    this.isAuth = sessionStorage.getItem('isAuth');
  }

  componentDidMount() {
    const user = {
      user_mail: this.user_mail
    }
    fetchUserJira(user).then(res => {
      if (!!res) {
        const jiras = []
        jiras.push(res.jiras)
        this.setState({
          rowData: jiras
        })

      }
    }).catch((err) => {
      console.log('error- ' + err)
    })
  }

  render() {
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
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Team Issues
      </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="ag-theme-alpine" style={{ height: '200px' }}>
                <AgGridReact
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}>
                </AgGridReact>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Home;