import React, { Component } from 'react'

class Landing extends Component {
    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Welcome to Jira Mock Application!!</h1>
                        <h3 className="text-center">Login to see your profile.</h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing