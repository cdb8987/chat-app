import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import MessageFeed from './Components/MessageFeed';
import UserBar from './Components/UserBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState } from 'react';


let Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2hhcmxpZSIsImV4cCI6MTY4MjA4NzUzOH0.uZ-vFdSQy-k3TY9uNX032-4-RHQuHI0y0San0nmGLBs';

const requestobject = {method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json',      'password': 'Password',
'Authorization': 'Basic Y2hhcmxpZTpQYXNzd29yZA=='}, body: null};

const getRequest = (endpointURL, requestobject)=>{
  return (
    fetch(endpointURL, requestobject)
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .catch(error=>console.log(error.message))
  )
}

const postRequest = (endpointURL, requestobject)=>{
  return (
    fetch(endpointURL, requestobject)
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .catch(error=>console.log(error.message))
  )
}

getRequest('http://127.0.0.1:5000', requestobject)






const dummyUsersOnline = ['Elon Musk', 'Batman', 'Marcus Aurelius', 'Russel Crowe', 'Princess Leia']

const dummyMessageFeed = [{name: 'Charlie', time: '9:00am', message: 'Hey whats up guys?'}, {name: 'Elon Musk', time: '9:15am', message: 'Dude you call this a messaging app?  Have you heard of Twitter?'}, {name: 'Marcus Aurelius', time: '9:30am', message: 'Elon, stop comparing yourself to other people.  Just try to be the best version of yourself.  Remember you are only a man.'}, {name: 'Russel Crowe', time: '9:40am', message: 'Lol 2023 and we have Marcus Aurelius scolding Elon Musk.  Are you not entertained?'}, {name: 'Princess Leia', time: '9:50am', message: 'I think messaging apps are hot ;)'}]

let loggedIn = false

function App() {
  let [logInStatus, setLoginStatus] = useState(loggedIn)
  
  if(logInStatus === true){
    return (
      <MainPage UsersOnline={dummyUsersOnline} MessageFeed={dummyMessageFeed} updateLogin={setLoginStatus}/>
    )
  }
  
  return (
    <div>

      <LoginPage updatelogin={setLoginStatus}/>
       
       
    </div>
    
    
  );
}

export default App;
