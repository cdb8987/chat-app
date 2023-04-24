import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import MessageFeed from './Components/MessageFeed';
import UserBar from './Components/UserBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState } from 'react';


const dummyUsersOnline = ['Elon Musk', 'Batman', 'Marcus Aurelius', 'Russel Crowe', 'Princess Leia']

const dummyMessageFeed = [{name: 'Charlie', time: '9:00am', message: 'Hey whats up guys?'}, {name: 'Elon Musk', time: '9:15am', message: 'Dude you call this a messaging app?  Have you heard of Twitter?'}, {name: 'Marcus Aurelius', time: '9:30am', message: 'Elon, stop comparing yourself to other people.  Just try to be the best version of yourself.  Remember you are only a man.'}, {name: 'Russel Crowe', time: '9:40am', message: 'Lol 2023 and we have Marcus Aurelius scolding Elon Musk.  Are you not entertained?'}, {name: 'Princess Leia', time: '9:50am', message: 'I think messaging apps are hot ;)'}]

let loggedIn = false

function App() {
  let [logInStatus, setLoginStatus] = useState(loggedIn)

  // const generateHeaders = (username, password, messagetext = false)=>{
  //   const myHeaders = new Headers();
  //   myHeaders.append("username", username)
  //   myHeaders.append("password", password);
  //   myHeaders.append("Authorization", "Basic Q2hhcmxpZTpQYXNzd29yZA==");
  //   if(messagetext){myHeaders.append("messagetext", messagetext);}
  //   return myHeaders
  // }



  
  if(logInStatus === true){
    return (
      <MainPage UsersOnline={dummyUsersOnline} MessageFeed={dummyMessageFeed} updateLogin={setLoginStatus}/>
    )
  }
  
  return (
    <div>

      <LoginPage updatelogin={setLoginStatus} />
       
       
    </div>
    
    
  );
}

export default App;
