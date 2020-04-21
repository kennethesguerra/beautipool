import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  }

  handleChange = (e) => {

    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email } = this.state;
    
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });

      console.log('Success', signUpResponse);
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Username" id="username" type="text" className="validate" onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Email" id="email" type="text" className="validate" onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handleChange}  />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Confirm Password" id="password" type="password" className="validate" onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="submit" value="Sign Up" className="btn btn-large"/>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    )
  }
}

export default SignUp