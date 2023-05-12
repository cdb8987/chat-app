import React, { useState } from 'react';
import ReEnterPassword from './ReEnterPassword';

function LoginPage(props){
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [reenterPassword, setReenterPassword] = useState('')
    const [displayReEnterPassword, setDisplayReEnterPassword] = useState(false)
    

    const [serverReplyMessage, setserverReplyMessage] = useState('')

    const handleSubmit = (username, password, requestType)=>{
        const myHeaders = new Headers();
        myHeaders.append("username", username)
        myHeaders.append("password", password);
        myHeaders.append("Authorization", "Basic Q2hhcmxpZTpQYXNzd29yZA==");
    
        const raw = "";

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        if(requestType === 'Login'){
        return (fetch(`${props.serverURL}/login`, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then((result)=>{
            if(result['login']=== true){props.setLoginStatus(true); sessionStorage.setItem('logInStatus', true)}
            else{setserverReplyMessage(result['message'])}

        }
        
        )
        .catch(error => console.log('error', error)) 
        )}
        if(requestType === 'CreateUser'){
            return (fetch(`${props.serverURL}/users`, requestOptions)
        .then(response => response.json())
        .then((response) => {
            setserverReplyMessage(response['message'])
        })
        .catch(error => console.log('error', error)) 
        )}
        }
    
    return (
        <div className="page">
            <div className="pagediv">
                <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                    <h1>Welcome to my Chat App!</h1>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', height: '70%'}}>                  
                    
                    <p> Username:  <input type="text" id="username" name="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} required/></p>   

                    <p> Password:  <input type="password" id="password" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} required/></p>
                    <ReEnterPassword displayReEnterPassword={displayReEnterPassword} setDisplayReEnterPassword={setDisplayReEnterPassword} reenterPassword={reenterPassword} setReenterPassword={setReenterPassword}/>
                    
                    {/* <p className='Reenterpassword'> Re-Enter:  <input type="password" id="reenterpassword" name="reenterpassword" 
                    value={reenterPassword} onChange={(e) => setReenterPassword(e.target.value)} required/></p> */}

                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        <button className="btn btn-primary" onClick={()=>{handleSubmit(username, password, 'Login');setUsername('');setPassword('')}}>LOG IN</button>
                        <p style={{paddingTop: '15px', paddingLeft: '20px', paddingRight: '20px'}}>   OR   </p>
                        <button className="btn btn-outline-primary" onClick={()=>{ 
                            if(!displayReEnterPassword){setDisplayReEnterPassword(true)}
                            else{
                                if(password === reenterPassword){
                                    handleSubmit(username, password, 'CreateUser');setUsername('');setPassword(''); setDisplayReEnterPassword(false)     
                                }
                                else{setserverReplyMessage('Passwords entered do not match.')}
                            }
                         
                            
                            }}>SIGN UP</button>
                </div>
                </div>
                <p style={{display: 'flex', justifyContent: 'center', alignItems:'center', color: 'red'}}>{serverReplyMessage}</p>
                
            </div>
            
        </div>
    )
}

export default LoginPage