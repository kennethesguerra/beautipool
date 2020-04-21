import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  }

    
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.history.push('/home');
    }
    catch (error) {
      console.log(error);
    }
  } 

  render() {
    return (
      <div>
        <h3>Login</h3>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
              <div className="input-field col s6">
                <input placeholder="Username or Email" id="username" type="text" className="validate" onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="submit" className="btn btn-large" value="Login" />
                <Link to="/signup"> Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    )
  }
}

export default SignIn