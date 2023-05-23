function MessageFeed(props){
    if(!props.messageFeed.length > 0){
        return
    }
    if(typeof props.messageFeed === 'undefined'){
        return
    }
    if(!props.messageFeed[0].name){
        return
    }

    const userName = document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1];
    
    let MessageData = (
        <div>
                {props.messageFeed.map(item=> (item.name===userName)?(
                <div className="sentMessage"><strong>{item.name}</strong> {String(item.time).replace('GMT', '')}   
                <div className="sentMessageText">
                    <p >{item.message}</p>
                    </div>
                </div>
                ): (
                    <div className="receivedMessage"><strong>{item.name}</strong> {String(item.time).replace('GMT',     '')}   
                    <div className="receivedMessageText">
                        <p >{item.message}</p>
                        </div>
                    </div>
                    ))}
            
        </div>
        
    )
    return MessageData
}

export default MessageFeed