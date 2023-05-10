import './App.css';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState } from 'react';

function App() {

  const dummyUsersOnline = []
  const dummyMessageFeed = []
  // const serverURL = 'https://chat-app-sdp2.onrender.com'
  const serverURL = 'http://127.0.0.1:5000/'
  let startingLogInStatus = false

  try{
    if(Boolean(sessionStorage.getItem('logInStatus')) === true){
      // console.log(typeof sessionStorage.getItem('logInStatus'), sessionStorage.getItem('logInStatus'))
      startingLogInStatus = true
    }
    else{console.log(typeof sessionStorage.getItem('logInStatus'), sessionStorage.getItem('logInStatus'))}
  }
  catch(error){console.log(error)}
  
  
  let [logInStatus, setLoginStatus] = useState(startingLogInStatus)
  let [messageFeed, setMessageFeed] = useState(dummyMessageFeed)
  let [activeUsers, setActiveUsers] = useState(dummyUsersOnline)
  let [channels, setChannels] = useState(['general', 'coding'])

  let channelId;
    if(sessionStorage.getItem('channelId')){
        channelId = sessionStorage.getItem('channelId');
      }
    else{ channelId = 1; sessionStorage.setItem('channelId', channelId)}
  

  // console.log('APP.JS RENDERED')
  
  if(logInStatus === true){
    return (
      <MainPage UsersOnline={dummyUsersOnline} messageFeed={messageFeed} setMessageFeed={setMessageFeed} setLoginStatus={setLoginStatus} activeUsers={activeUsers} setActiveUsers={setActiveUsers} serverURL={serverURL} channels={channels} setChannels={setChannels} channelId={channelId} /> 
    )
  }
  
  return (
    <div>
      <LoginPage setLoginStatus={setLoginStatus} serverURL={serverURL} />  
    </div>
  );
}

export default App;

