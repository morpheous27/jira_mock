import React, { useContext, Component } from 'react'
import { login } from './UserFunctions'
import { Alert } from 'react-bootstrap'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            user_mail: '',
            password: '',
            errors: {},
            isAuth: false,
            redirectUrl: null
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            user_mail: this.state.user_mail,
            password: this.state.password
        }
        
        login(user).then(res => {
            if (res) {
                sessionStorage.setItem('user_mail',res.user_mail)
                sessionStorage.setItem('first_name',res.first_name)
                sessionStorage.setItem('last_name',res.last_name)
                sessionStorage.setItem('isAuth',true)
                this.props.history.push('/home')
            }else{
                sessionStorage.setItem('isAuth',false)
                this.props.history.push('/login')
            }
        }).catch((err) => {
            sessionStorage.setItem('isAuth',false)
            console.log('error- ' + err)
            this.props.history.push('/')
        })
        
    }

    render() {
        if(sessionStorage.getItem('isAuth') == false){
            return <Alert variant="info">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              You need to Sign In/Register first to load your profile.
            </p>
            <hr />
          </Alert>
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="user_mail"
                                    placeholder="Enter your email"
                                    value={this.state.user_mail}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
              </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login