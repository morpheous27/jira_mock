import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class BrandHeader extends Component {

  render() {
    const loginRegLink = (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">JIRA Mock</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

    const loggedInUser = (
      <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">JIRA Mock</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/createTicket">Create</Nav.Link>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav.Link style={{ 'marginLeft': '550px' }} href="/logout">Log Out</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <div><br></br><br></br></div>
      </div>
    )

    if (sessionStorage.getItem('isAuth') == undefined || sessionStorage.getItem('isAuth') == false) {
      return (loginRegLink)
    }
    else {
      return (loggedInUser)
    }
  }
}

export default withRouter(BrandHeader)
