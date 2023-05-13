import React, { useEffect, useState } from 'react';
import UserData from './UserData';
import MessageFeed from './MessageFeed';
import ChannelList from './ChannelList';
import Conversations from './Conversations';
import MessageFeedTitle from './MessageFeedTitle'

function MainPage(props){
    

    let [sendMessageText, setSendMessageText] = useState('')
    const [count, setCount] = useState(0); 
    if(!sessionStorage.getItem('MessageTypeSelection')){
        sessionStorage.setItem('MessageTypeSelection', 'channel')
    }
    let MessageTypeSelection = sessionStorage.getItem('MessageTypeSelection')

    if(!sessionStorage.getItem('FriendUsername')){
        sessionStorage.setItem('FriendUsername', '')
    }
    let FriendUsername = sessionStorage.getItem('FriendUsername')
    
    if(!sessionStorage.getItem('LeftContainerComponentSelect')){
        sessionStorage.setItem('LeftContainerComponentSelect', 'Channels')
    } 
    let LeftContainerComponentSelect = sessionStorage.getItem('LeftContainerComponentSelect');
    if(!sessionStorage.getItem('ChannelName')){
        sessionStorage.setItem('ChannelName', 'General')
    } 
    



    
    
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
    const retrieveUserList = ()=>{
        if(sessionStorage.getItem('userlist')){
            const storedUsers = JSON.parse(sessionStorage.getItem('userlist'))
            // console.log(`userlist pulled from sessionstorage is a ${typeof storedUsers}with value`, storedUsers)
            return (
                <div className="Conversations">
                    <p className="ConversationsTitle">Conversations</p>
                    <select onChange={(e)=> sessionStorage.setItem('FriendUsername', e.target.value)}    class="form-select" aria-label="Default select example">
                        <option selected>Select User</option>
                        {storedUsers.map(item=> (<option>{item}</option>))}
                    </select>
                </div>
                
                

            )
        }
        else{
        fetch(`${props.serverURL}/users`)
        .then(response=> response.json())
        .then((response)=> {
            sessionStorage.setItem('userlist', JSON.stringify(response));
            // console.log(`userlist pulled from fetch request is a ${typeof response}with value`, response)
            return response
            
        })
        .then((response)=>{
            return (
                <div className="Conversations">
                    <p className="ConversationsTitle">Conversations</p>
                    <select onChange={(e)=> sessionStorage.setItem('FriendUsername', e.target.value)}    class="form-select" aria-label="Default select example">
                        <option selected>Select User</option>
                        {response.map(item=> (<option>{item}</option>))}
                    </select>
        
                    
                </div>
                
            )


        })
        
        
        
        }
    }
    const updateActiveUsers = ()=>{
        fetch(`${props.serverURL}/onlineusers`)
        .then(response=> response.json())
        .then((response)=> {
            if(String(props.activeUsers) != String(response)){
                props.setActiveUsers(response)
            }
            
        })
    }
    const updateMessageFeed = ()=>{
        const messageType = sessionStorage.getItem('MessageTypeSelection')
        fetch(`${props.serverURL}/messages?ChannelId=${sessionStorage.getItem('channelId')}&MessageType=${messageType}&FriendUsername=${sessionStorage.getItem('FriendUsername')}`)
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
        myHeaders.append("FriendUsername", FriendUsername)
        
    
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
    
    let LeftContainerComponent;
    switch (LeftContainerComponentSelect){
        case 'Conversations':
            LeftContainerComponent = (<Conversations retrieveUserList={retrieveUserList}/>)
            break;
        case 'Channels':
            LeftContainerComponent = (<ChannelList channels={props.channels} updateChannelId={updateChannelId} updateMessageFeed={updateMessageFeed}/>)
            break;
        default:
            LeftContainerComponent = (<ChannelList channels={props.channels} updateChannelId={updateChannelId} updateMessageFeed={updateMessageFeed}/>)
            break;

    }


    return (
        <div className="page">
                <div className="pagediv" style={{display: 'flex'}}>
                    <div className="userbar" style={{flexBasis: '33.33%', borderRightColor: 'black', borderRightStyle: 'solid'}}>
                        <div style={{textAlign: 'center', height: '10%', marginTop: '10px'}}>
                            
                            <button className="btn btn-outline-dark" onClick={()=> {sessionStorage.setItem('MessageTypeSelection', 'channel'); sessionStorage.setItem('LeftContainerComponentSelect', 'Channels')}}>Feed</button>
                            <button className="btn btn-outline-dark" onClick={()=> {sessionStorage.setItem('MessageTypeSelection', 'DirectMessage'); sessionStorage.setItem('LeftContainerComponentSelect', 'Conversations')}}>Direct Messages</button>
                        </div>
                        {LeftContainerComponent}
                        <UserData activeUsers={props.activeUsers} logOut={logOut}/>
                        </div>
                        <div className="messagefeed" style={{flexBasis: '66.66%'}}>
                            <MessageFeedTitle/>
                            <div style={{height: '70%', overflow:'auto'}}>
                                <MessageFeed messageFeed={props.messageFeed} />
                            </div>
                            
                            <div><form novalidate><input onSubmit={handleSend} style={{width:"100%"}}value={sendMessageText} onChange={(e) => setSendMessageText(e.target.value)} required></input>
                            </form>
                                <div style={{display: 'flex', flexWrap: 'wrap', alignContent: 'space-between'}}>
                                <button className="btn btn-primary"  onClick={handleSend}  >Send</button>
                                <button className='btn btn-secondary' style={{marginLeft: '350px'}}onClick={()=> {logOut()}}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    
                    
                </div>
                
                
            </div>  
    )
}

export default MainPage