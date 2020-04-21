import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';



class Navbar extends Component {

  handleLogOut = async (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push('/');
    }catch(error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div>
          <nav>
            <div className="nav-wrapper">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <div>
                  <div className="brand-logo center">Hello, Beautipool {this.props.auth.user.username}</div>
                  <button className="btn btn-small" onClick={this.handleLogOut}>Logout</button>
                </div>
              )}
              {!this.props.auth.isAuthenticated && !this.props.auth.user && (
                <div className="brand-logo center">
                  <Link to="/">Beautipool</Link>
                </div>
              )}

            </div>
          </nav>
      </div>
    )
  }
  
}

export default Navbar;
