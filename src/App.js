import React, { Component } from 'react';
import UserLogin from './components/userLogin';
import ChatScreen from './components/ChatScreen';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'InitialScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
      .then(response => {
        this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
        })
        localStorage.setItem('username', this.state.currentUsername);
      })
      .catch(error => console.error('error', error))
  }

  render() {
    if (this.state.currentScreen === 'InitialScreen') {
      return <UserLogin onSubmit={this.onUsernameSubmitted} />
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App
