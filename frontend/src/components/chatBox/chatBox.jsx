import '../../stylesheets/reset.css';
import '../../stylesheets/chat.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, receiveSystemMessage } from '../../actions/socketActions';

function ChatBox ( { gameId, username } ) {
  const [chatMessage, setChatMessage] = useState("");
  const dispatch = useDispatch();
  const socket = useSelector (state => state.socket.socket);
  const messages = useSelector (state => state.socket.messages);
  
  useEffect (() => {
    const receiveChat = ({ username, msg }) => {
      dispatch(receiveMessage({ message: <p className='user-msg'><span className='user'>{username}:</span> {msg}</p> }));
    }
    
    const receiveSysMessage = ({ msg }) => {
      dispatch(receiveSystemMessage({ msg }));
    }

    if (!socket) {
      // Only print join message when player first comes to the game,
      // not on every remount (e.g., after login screen) 
      receiveSysMessage({msg: "Click 'Join Game' to play!"});
      return;
    }

    socket.on("systemMessage", receiveSysMessage);
    socket.on("chat", receiveChat);
    
    // receiveSysMessage({msg: "Click 'Join Game' to play!"});

    return (() => {
      socket.off("systemMessage", receiveSystemMessage);
      socket.off("chat", receiveChat);
    });
  }, [dispatch, socket]);

  const handleChange = ({ target: {value} }) => {
    setChatMessage(value);
  }
  
  const sendChat = e => {
    e.preventDefault();
    if (chatMessage === "") return;
    dispatch(receiveMessage({ message: <p className='me-msg'>{chatMessage}</p> }));
    socket.emit('chat', { gameId, username, msg: chatMessage });
    setChatMessage("");
  }

  const messageList = messages?.map ((message, idx) => {
    return (<li key={idx}>{message}</li>)
  });

  return (
    <div className='chat'>
      <h2 className='info-header chat-header'>Chat</h2>
      <div className='chat-box'>
          <div className='msg-wrap'>
              <ul id="chat-content">{messageList}</ul>
          </div>
      </div>
      <div className='chat-container'>
          <form className='chat-form'>
              <input  id='chat-input' 
                      name="chat" 
                      type="text" 
                      placeholder='say hi' 
                      value={chatMessage} 
                      onChange={handleChange}/>
              <button 
                      onClick={sendChat} 
                      type="submit"
                      className='submit lower-button send'>Send</button>
          </form>
      </div>
    </div>
  );
}

export default ChatBox;
