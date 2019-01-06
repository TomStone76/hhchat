import React, { Component } from 'react';
import ChatMessage from './Components/ChatMessage';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit ({
  instanceLocator: "v1:us1:79a82f98-922b-4900-984a-e22b0619b527",
  key: "ea990234-bee3-40a1-9ffc-46c028748125:ISiUrcveffdDM77zO3TYe37AAJzXws2psME+ShAZlS0="
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentView: 'signup'
    }
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser(username) {
    chatkit.createUser({
      id: username,
      name: username,
    })
    .then((currentUser) => {
      this.setState({
        currentUsername: username,
        currentId: username,
        currentView: 'chatApp'
      })
    }).catch((err) => {
            if(err.status = 400) {
          this.setState({
              currentUsername: username,
              currentId: username,
              currentView: 'chatApp'
          })
        } else {
            console.log(err.status);
        }
      });
    }

  changeView(view) {
      this.setState({
        currentView: view
      })
  }

  render() {
        let view = '';

        if (this.state.currentView === "ChatMessage") {
            view = <ChatMessage changView={this.changeView}/>
        } else if (this.state.currentView === "signup") {
            view = <Signup onSubmit={this.createUser}/>
        } else if (this.state.currentView === 'chatApp') {
            view = <ChatApp currentId={this.state.currentId}/>  
        }
        return (
          <div className="App">
              {view}
          </div>
        )
  }
}

export default App;