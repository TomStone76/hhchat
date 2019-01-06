import React, {Component} from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: {users:[]},
            messages: [],
            users: []
        }
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: "v1:us1:79a82f98-922b-4900-984a-e22b0619b527",
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/79a82f98-922b-4900-984a-e22b0619b527/token"
            })
        })
        
        chatManager
            .then(currentUser => {
                this.setState({ currentUser: currentUser })
                return currentUser.subscribeToRoom({
                    roomId: "19393828",
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                    }
                })
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom, 
                    users: currentRoom.userIds
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="chatapp">
                <div>
                    <h2 className="header">Let's Talk</h2>
                </div>
            </div>
        )
    }
}
export default ChatApp;