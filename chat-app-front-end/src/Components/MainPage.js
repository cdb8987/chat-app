import React, { useState } from 'react';

function MainPage(props){
    // console.log(props.UsersOnline)

    let [sendMessageText, setSendMessageText] = useState('')


    const logOut = ()=>{
        return fetch("http://127.0.0.1:5000/logout")
    }
    const writeMessage = (MessageText)=>{
        const myHeaders = new Headers();
    
        myHeaders.append("MessageText", MessageText);
        // if(messagetext){myHeaders.append("messagetext", messagetext);}
    
        const raw = "";

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(requestOptions);
        
        
        console.log('messagetext changed to', sendMessageText)

        return (
            fetch("http://127.0.0.1:5000/messages", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((result)=>{
            console.log(typeof result)
            console.log('result.login returns', result['login'])
            if(result['login']=== true){props.updatelogin(true)}
            }
            ))
        }

    
    
   
    let UserData = (
        <div>
            {props.UsersOnline.map(item=>(<p>🟢{item}</p>))}
        </div>
    )
    let MessageData = (
        <div>
            {props.MessageFeed.map(item=> (
            <div><strong>{item.name}</strong> {item.time}   
            <div>
                <p style={{border:'gray', borderStyle:'solid', borderRadius:'5px'}}>{item.message}</p>
                </div>
            </div>
            ))}
        </div>
        
    )


    return (
        <div className="page">
                <div className="pagediv" style={{display: 'flex'}}>
                    <div className="userbar" style={{flexBasis: '33.33%', borderRightColor: 'lightgrey', borderRightStyle: 'solid'}}>
                        <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                            ONLINE NOW
                                                
                        </div>
                        <div className="userdata">{UserData}
                        </div>
                    </div>
                    <div className="messagefeed" style={{flexBasis: '66.66%', overflow:'auto'}}>
                        <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                                MESSAGES
                                <button style={{float: 'right'}}onClick={()=> {props.updateLogin(false); logOut()}}>Log Out</button>
                        </div>
                        {MessageData}
                        <div><button className="btn btn-primary" onClick={()=> {writeMessage(sendMessageText); setSendMessageText('')}}  >Send Message</button><input style={{width:"100%"}}value={sendMessageText} onChange={(e) => setSendMessageText(e.target.value)} required></input></div>
                    </div>
                    
                    
                </div>
                
                
            </div>  
    )
}

export default MainPage