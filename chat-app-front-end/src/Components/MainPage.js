import React, { useEffect, useState } from 'react';
import UserData from './UserData';
import MessageFeed from './MessageFeed';
import ChannelList from './ChannelList';

function MainPage(props){
    

    let [sendMessageText, setSendMessageText] = useState('')
    const [count, setCount] = useState(0); 
    if(!sessionStorage.getItem('MessageTypeSelection')){
        sessionStorage.setItem('MessageTypeSelection', 'direct_message')
    }
    let MessageTypeSelection = sessionStorage.getItem('MessageTypeSelection')

    if(!sessionStorage.getItem('RecipientUsername')){
        sessionStorage.setItem('RecipientUsername', 'carlosjackal')
    }
    let RecipientUsername = sessionStorage.getItem('RecipientUsername')


    const updateChannellist = ()=>{
        fetch(`${props.serverURL}/channels`)
        .then(response=> response.json())
        .then((response)=> {
            if(String(props.activeUsers) != String(response)){
                props.setChannels(response)
            }
            
        })
    }
    const updateChannelId = (channelId)=>{
        sessionStorage.setItem('channelId', channelId)  
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
    const updateMessageFeed = ()=>{
        fetch(`${props.serverURL}/messages?ChannelId=${sessionStorage.getItem('channelId')}`)
        .then(response=> response.json())
        .then((response)=>{
            let message_feed = []
            
            for(let i=0; i < response.length; i++ ){
                const entry = {name: response[i][4], time: response[i][3], message: response[i][2]}
                message_feed.push(entry)
                
            }
            props.setMessageFeed(message_feed)
            return message_feed
        })
        .catch(error => console.log('error', error))
}
    const logOut = ()=>{
        sessionStorage.setItem('logInStatus', false) 
        return fetch(`${props.serverURL}/logout`).then(()=> props.setLoginStatus(false))
    }
    const handleSend = ()=>{
        writeMessage(sendMessageText); 
        setSendMessageText(''); 
        updateActiveUsers(); 
        updateMessageFeed()
    }

    const writeMessage = (MessageText)=>{
        const myHeaders = new Headers();
        console.log("MessageType", MessageTypeSelection)
        myHeaders.append("MessageText", MessageText);
        myHeaders.append("ChannelId", props.channelId)
        myHeaders.append("MessageType", MessageTypeSelection)
        myHeaders.append("RecipientUsername", RecipientUsername)
        
    
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
                updateMessageFeed();
            if(result['login']=== true){props.updatelogin(true)}
            }
            ))
        }
    
    
    
    useEffect(()=> {
        const interval = setInterval(()=>{setCount(count => count + 1); updateActiveUsers();
            updateMessageFeed(); updateChannellist()}, 1000);
        return ()=>{clearInterval(interval)}
    }, [])
    
    return (
        <div className="page">
                <div className="pagediv" style={{display: 'flex'}}>
                    <div className="userbar" style={{flexBasis: '33.33%', borderRightColor: 'lightgrey', borderRightStyle: 'solid'}}>
                        <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                            <button className="btn btn-outline-primary">Online Now</button>
                            <button className="btn btn-outline-primary">Friends</button>
                            <button className="btn btn-outline-primary">Channels</button>                       
                        </div>
                        <UserData activeUsers={props.activeUsers}/>
                        <ChannelList channels={props.channels} updateChannelId={updateChannelId} updateMessageFeed={updateMessageFeed}/>
                    </div>
                    <div className="messagefeed" style={{flexBasis: '66.66%'}}>
                    <div  className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                            <button className="btn btn-light">Feed</button>
                            <button className="btn btn-light">Direct Messages</button>
                        
                            <button className='btn btn-secondary' style={{float: 'right'}}onClick={()=> {logOut()}}>Log Out</button>
                    </div>

                    <div style={{height: '70%', overflow:'auto'}}>
                        <MessageFeed messageFeed={props.messageFeed} />
                    </div>
                        
                    <div><form novalidate><button className="btn btn-primary" onClick={handleSend}  >Send Message</button><input onSubmit={handleSend} style={{width:"100%"}}value={sendMessageText} onChange={(e) => setSendMessageText(e.target.value)} required></input></form>
                    </div>
                    </div>
                    
                    
                </div>
                
                
            </div>  
    )
}

export default MainPage