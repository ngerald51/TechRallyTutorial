import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.scss';
import './stylesheets/main.scss';
import { Button } from 'react-bulma-components';

import { appConfig } from 'utils/constants';
import { UserSession } from 'blockstack';

class App extends Component {
  state={
    userSession: new UserSession ({ appConfig })
  }

  componentDidMount = async () => {
    const { userSession } = this.state

    if (!userSession.isUserSignedIn() && userSession.isSignPending()) {
      const userData = await userSession.handlePendingSignIn()

      if (!userData.username) {
        throw new Error(' This app requires a username')

      }

      window.location='/'
    }
  }

  handleSignIn = () => {
    const { userSession }= this.state
    userSession.redirectToSignIn()
  }

  handleSignOut  = () => {
    console.log('handle sign out')
  }

  render() {
    const { userSession } = this.state

    return (
      <div className="App">
      {
        userSession.isUserSignedIn() ?
        <Button color="primary">
          Sign Out
        </Button> :

        <Button color="secondary">
        Sign In
      </Button>
      
      }
      </div>
    );
  }
}

export default App;
