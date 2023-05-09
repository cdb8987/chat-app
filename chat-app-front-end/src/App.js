import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import MessageFeed from './Components/MessageFeed';
import UserBar from './Components/UserBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState } from 'react';




let loggedIn = false

function App() {

  // const dummyUsersOnline = ['Elon Musk', 'Batman', 'Marcus Aurelius', 'Russel Crowe', 'Princess Leia']
  const dummyUsersOnline = []
  
  const dummyMessageFeed = []
  

  // const serverURL = 'https://chat-app-sdp2.onrender.com'
  const serverURL = 'http://127.0.0.1:5000/'




  let [logInStatus, setLoginStatus] = useState(loggedIn)
  let [messageFeed, setMessageFeed] = useState(dummyMessageFeed)
  let [activeUsers, setActiveUsers] = useState(dummyUsersOnline)
  let [channels, setChannels] = useState(['general', 'coding'])

  let channelId;
    if(sessionStorage.getItem('channelId')){
        channelId = sessionStorage.getItem('channelId');
        console.log('channelId from session storage used.  ', channelId)
      }
    else{ channelId = 1; sessionStorage.setItem('channelId', channelId)
console.log('channelId reset to 1')}
  

  console.log('APP.JS RENDERED')
  
  if(logInStatus === true){
    return (
      <MainPage UsersOnline={dummyUsersOnline} messageFeed={messageFeed} setMessageFeed={setMessageFeed} setLoginStatus={setLoginStatus} activeUsers={activeUsers} setActiveUsers={setActiveUsers} serverURL={serverURL} channels={channels} setChannels={setChannels} channelId={channelId} />
     
    )
  }

  
  
  return (
    <div>
      {/* <MainPage UsersOnline={dummyUsersOnline} messageFeed={messageFeed} setMessageFeed={setMessageFeed} setLoginStatus={setLoginStatus} activeUsers={activeUsers} setActiveUsers={setActiveUsers} serverURL={serverURL}/> */}
      <LoginPage updatelogin={setLoginStatus} serverURL={serverURL} />
       
       
    </div>
    
    
  );
}

export default App;

