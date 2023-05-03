import React, { useEffect, useState } from 'react';

function MainPage(props){
    

    let [sendMessageText, setSendMessageText] = useState('')
    const [count, setCount] = useState(0);
    

    const logOut = ()=>{
        return fetch(`${props.serverURL}/logout`).then(()=> props.setLoginStatus(false))
    }
    const updateActiveUsers = ()=>{
        fetch(`${props.serverURL}/users`)
        .then(response=> response.json())
        .then((response)=> {
            if(String(props.activeUsers) != String(response)){
                props.setActiveUsers(response)
            }
            
        })
    }

    const writeMessage = (MessageText)=>{
        const myHeaders = new Headers();
    
        myHeaders.append("MessageText", MessageText);
    
        const raw = "";

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };


        return (
            fetch(`${props.serverURL}/messages`, requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((result)=>{
            retrieveMessageFeed();
            if(result['login']=== true){props.updatelogin(true)}
            }
            ))
        }
    
    const retrieveMessageFeed = ()=>{
            fetch(`${props.serverURL}/messages`)
            .then(response=> response.json())
            .then((response)=>{
                let message_feed = []
                console.log('WHOLE RESPONSE : ', response)
                for(let i=0; i < response.length; i++ ){
                    const entry = {name: response[i][4], time: response[i][3], message: response[i][2]}
                    message_feed.push(entry)
                    console.log('RESPONSE[i] INSIDE LOOP', response[i])
                }
                props.setMessageFeed(message_feed)
                return message_feed
            })
            .catch(error => console.log('error', error))
    }
    
    useEffect(()=> {
        const interval = setInterval(()=>{setCount(count => count + 1); updateActiveUsers();
            retrieveMessageFeed()}, 1000);
        return ()=>{clearInterval(interval)}
    }, [])
    
 
    let UserData = (
        <div>
            {props.activeUsers.map(item=>(<p>🟢{item}</p>))}
        </div>
    )
    
    let MessageData = (
        <div>
            {props.messageFeed.map(item=> (
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
                    <div className="messagefeed" style={{flexBasis: '66.66%'}}>
                        <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                                MESSAGES
                        
                                <button style={{float: 'right'}}onClick={()=> {logOut()}}>Log Out</button>
                        </div>

                        <div style={{height: '70%', overflow:'auto'}}>
                        {MessageData}
                        </div>
                        
                        <div><button className="btn btn-primary" onClick={()=> {writeMessage(sendMessageText); setSendMessageText(''); updateActiveUsers();retrieveMessageFeed() }}  >Send Message</button><input style={{width:"100%"}}value={sendMessageText} onChange={(e) => setSendMessageText(e.target.value)} required></input></div>
                    </div>
                    
                    
                </div>
                
                
            </div>  
    )
}

export default MainPage