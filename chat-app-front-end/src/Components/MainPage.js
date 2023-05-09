import React, { useEffect, useState } from 'react';

function MainPage(props){
    

    let [sendMessageText, setSendMessageText] = useState('')
    const [count, setCount] = useState(0);
    const [messageFeedSelection, setMessageFeedSelection] = useState('channels')
    
    
//     let channelId;
//     if(sessionStorage.getItem('channelId')){
//         channelId = sessionStorage.getItem('channelId');
//         console.log('channelId from session storage used.  ', channelId)
//       }
//     else{ channelId = 1; sessionStorage.setItem('channelId', channelId)
// console.log('channelId reset to 1')}

    
    
      const updateChannelId = (channelId)=>{
        sessionStorage.setItem('channelId', channelId)
        
    }
    

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

    const updateChannellist = ()=>{
        fetch(`${props.serverURL}/channels`)
        .then(response=> response.json())
        .then((response)=> {
            if(String(props.activeUsers) != String(response)){
                props.setChannels(response)
            }
            
        })
    }

    const writeMessage = (MessageText)=>{
        const myHeaders = new Headers();
        
        myHeaders.append("MessageText", MessageText);
        myHeaders.append("ChannelId", props.channelId)
        
        
    
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
    
    useEffect(()=> {
        const interval = setInterval(()=>{setCount(count => count + 1); updateActiveUsers();
            retrieveMessageFeed(); updateChannellist()}, 1000);
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
    let Channellist = (
        <div>
            {props.channels.map(item=> (
            <div><button type="button" class="btn btn-outline-dark" onClick={()=> {updateChannelId(item[0]); retrieveMessageFeed(); console.log('setChannelID executed with value:', item[0]); console.log('channelID in sessionstorage is:', sessionStorage.getItem('channelId')); }}>{item[1]} </button>  
            
            </div>
            ))}
        </div>
    )

    
    return (
        <div className="page">
                <div className="pagediv" style={{display: 'flex'}}>
                    <div className="userbar" style={{flexBasis: '33.33%', borderRightColor: 'lightgrey', borderRightStyle: 'solid'}}>
                        <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                            <button className="btn btn-outline-primary">Online Now</button>
                            <button className="btn btn-outline-primary">Friends</button>
                            <button className="btn btn-outline-primary">Channels</button>                       
                        </div>
                        <div className="userdata">{UserData}
                        </div>
                        <div classname="channellist">
                            {Channellist}
                        </div>
                    </div>
                    <div className="messagefeed" style={{flexBasis: '66.66%'}}>
                        <div  className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                            <button className="btn btn-light">Feed</button>
                            <button className="btn btn-light">Direct Messages</button>
                        
                                <button className='btn btn-secondary' style={{float: 'right'}}onClick={()=> {logOut()}}>Log Out</button>
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