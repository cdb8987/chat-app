import React, { useEffect, useState } from 'react';
// import MessageFeed from './MessageFeed';

function MainPage(props){
    

    let [sendMessageText, setSendMessageText] = useState('')
    const [count, setCount] = useState(0);
    

    const logOut = ()=>{
        return fetch("https://chat-app-sdp2.onrender.com/logout").then(()=> props.setLoginStatus(false))
    }
    const updateActiveUsers = ()=>{
        fetch("https://chat-app-sdp2.onrender.com/users")
        .then(response=> response.json())
        .then((response)=> {
            if(String(props.activeUsers) != String(response)){
                // console.log('props.activeusers:',props.activeUsers, 'response:', response, 'RESETTING ACTIVE USER STATE', 'props and response are the same: ', props.activeUsers == response, 'type of props', typeof props.activeUsers, 'typeof response ', response)
                console.log('page-rerender triggered by updateActiveUsers')
                props.setActiveUsers(response)
            }
            
        })
    }
    
    // const autoUpdateActiveUsers = ()=>{setInterval(updateActiveUsers, 5000)};
    // // updateActiveUsers()
    // autoUpdateActiveUsers()

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
            fetch("https://chat-app-sdp2.onrender.com/messages", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((result)=>{
            console.log(typeof result);
            retrieveMessageFeed()
            console.log('result.login returns', result['login'])
            if(result['login']=== true){props.updatelogin(true)}
            }
            ))
        }
    
    const retrieveMessageFeed = ()=>{
            fetch("https://chat-app-sdp2.onrender.com/messages")
            .then(response=> response.json())
            .then((response)=>{
                let message_feed = []
                // {name: 'Charlie', time: '9:00am', message: 'Hey whats up guys?'}
                for(let i=0; i < response.length; i++ ){
                    const entry = {name: response[i][4], time: response[i][3], message: response[i][2]}
                    message_feed.push(entry)
                }
                console.log(props)
                console.log('page-rerender triggered by retrieveMessageFeed')
                props.setMessageFeed(message_feed)
                console.log('HERE IS YOUR FORMATTED MESSAGE FEED ', message_feed)
                return message_feed
            })
            .catch(error => console.log('error', error))
    }
    
    useEffect(()=> {
        const interval = setInterval(()=>{setCount(count => count + 1); updateActiveUsers();
            retrieveMessageFeed()}, 1000);
        return ()=>{clearInterval(interval)}
    }, [])
    
    
    
    // const autoUpdateMessageFeed = ()=>{setInterval(retrieveMessageFeed, 5000)}
    // autoUpdateMessageFeed()
    let UserData = (
        <div>
            {props.activeUsers.map(item=>(<p>🟢{item}</p>))}
        </div>
    )
    console.log(props)
    console.log('\n\n YOUR MESSAGE FEED CURRENTLY CONTAINS', props.messageFeed)
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
                                {/* <button style={{float: 'right'}}onClick={()=> {props.updateLogin(false); logOut()}}>Log Out</button> */}
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