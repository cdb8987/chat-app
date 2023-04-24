import React, { useState } from 'react';

function LoginPage(props){
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (username, password, requestType)=>{
        const myHeaders = new Headers();
        myHeaders.append("username", username)
        myHeaders.append("password", password);
        myHeaders.append("Authorization", "Basic Q2hhcmxpZTpQYXNzd29yZA==");
        // if(messagetext){myHeaders.append("messagetext", messagetext);}
    
        const raw = "";

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(requestOptions);
    
        if(requestType === 'Login'){
        return (fetch("http://127.0.0.1:5000/login", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)) 
        )}
        if(requestType === 'CreateUser'){
            return (fetch("http://127.0.0.1:5000/users", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)) 
        )}
        }
                
            // }
    


    return (
        <div className="page">
            <div className="pagediv">
                <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                    <h1>Welcome to my Chat App!</h1>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', height: '70%'}}>
                    
                    
                    
                    
                    
                    <p> Username:  <input type="text" id="username" name="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} required/></p>   

                    <p> Password:  <input type="text" id="password" name="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} required/></p>


                    {/* <p> Password:  <input id='Password'type="text" name="Password"/></p> */}








                    

                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        <button className="btn btn-primary" onClick={()=>{handleSubmit(username, password, 'Login'); props.updatelogin(true)}}>LOG IN</button>
                        <p style={{paddingTop: '15px', paddingLeft: '20px', paddingRight: '20px'}}>   OR   </p>
                        <button className="btn btn-outline-primary" onClick={()=>{handleSubmit(username, password, 'CreateUser')}}>SIGN UP</button>
                </div>
                </div>
                
                
            </div>
            


            
        </div>
    )
}

export default LoginPage