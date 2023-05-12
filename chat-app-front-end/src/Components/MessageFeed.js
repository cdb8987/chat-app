function MessageFeed(props){
    let TitleContent;
    TitleContent = (sessionStorage.getItem('LeftContainerComponentSelect')==='Channels') ?`#${sessionStorage.getItem('ChannelName')}` : `Message History`

    const userName = document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1];
    
    let MessageData = (
        <div>
            <p className="MessageFeedTitle">{TitleContent}</p>
            {props.messageFeed.map(item=> (item.name===userName)?(
            <div className="sentMessage"><strong>{item.name}</strong> {item.time}   
            <div className="sentMessageText">
                <p >{item.message}</p>
                </div>
            </div>
            ): (
                <div className="receivedMessage"><strong>{item.name}</strong> {item.time}   
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