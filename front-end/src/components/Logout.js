import React, { useContext, Component } from 'react'
import { login } from './UserFunctions'

class Logout extends Component {

   componentDidMount(){
    sessionStorage.clear()
    this.props.history.push('/')
   }

   render()
   {
       return ""
   }
   
}

export default Logout