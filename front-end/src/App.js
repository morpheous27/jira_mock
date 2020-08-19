import { action, computed, decorate, observable } from 'mobx'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BrandHeader from './components/BrandHeader'
import Home from './components/Home'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Ticket from './components/Ticket'
import Logout from './components/Logout'
import CreateTicket from './components/CreateTicket'
import UpdateSuccess from './components/UpdateSuccess'
import CreateSuccess from './components/CreateSuccess'



class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <BrandHeader />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/createTicket" component={CreateTicket} />
            <Route exact path="/ticket" component={Ticket} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/updateSuccess" component={UpdateSuccess} />
            <Route exact path="/createSuccess" component={CreateSuccess} />

          </div>
        </div>
      </Router >
    )
  }
}

export default App