import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';
import Amplify, { Auth } from 'aws-amplify';

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null,
    isAuthenticating: true
  }

  setAuthStatus = (authenticated) => {
    this.setState({
      isAuthenticated: authenticated
    });
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      console.log(session);
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    }
    catch (error) {
      console.log(error);
    }

    this.setState({
      isAuthenticating: false
    })
  }
  render() {

    const authProps = {
      isAuthenticated: this.state.isAuthenticated, 
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    return (
      !this.state.isAuthenticating && 
      <BrowserRouter>
        <div className="App">
          <Navbar auth={authProps} />
          <div className="container">
            <Switch>
              <Route exact path="/" render={(props) => <SignIn {...props} auth={authProps} />} />
              <Route path="/signup" component={SignUp} />
              <Route path="/home" component={Home} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      
    );
  }  
}

export default App;
