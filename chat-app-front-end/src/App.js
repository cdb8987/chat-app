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
  
  // const dummyMessageFeed = [{name: 'Charlie', time: '9:00am', message: 'Hey whats up guys?'}, {name: 'Elon Musk', time: '9:15am', message: 'Dude you call this a messaging app?  Have you heard of Twitter?'}, {name: 'Marcus Aurelius', time: '9:30am', message: 'Elon, stop comparing yourself to other people.  Just try to be the best version of yourself.  Remember you are only a man.'}, {name: 'Russel Crowe', time: '9:40am', message: 'Lol 2023 and we have Marcus Aurelius scolding Elon Musk.  Are you not entertained?'}, {name: 'Princess Leia', time: '9:50am', message: 'I think messaging apps are hot ;)'}]

  // const serverURL = 'https://chat-app-sdp2.onrender.com'
  const serverURL = 'http://127.0.0.1:5000/'




  let [logInStatus, setLoginStatus] = useState(loggedIn)
  let [messageFeed, setMessageFeed] = useState(dummyMessageFeed)
  let [activeUsers, setActiveUsers] = useState(dummyUsersOnline)
  let [channels, setChannels] = useState(['general', 'coding'])
  // let [activeUsers, setActiveUsers] = useState(dummyUsersOnline)

  
  
  if(logInStatus === true){
    return (
      <MainPage UsersOnline={dummyUsersOnline} messageFeed={messageFeed} setMessageFeed={setMessageFeed} setLoginStatus={setLoginStatus} activeUsers={activeUsers} setActiveUsers={setActiveUsers} serverURL={serverURL} channels={channels} setChannels={setChannels}/>
     
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

