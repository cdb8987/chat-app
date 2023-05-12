function MessageFeed(props){
    let TitleContent;
    TitleContent = (sessionStorage.getItem('LeftContainerComponentSelect')==='Channels') ?`#${sessionStorage.getItem('ChannelName')}` : `Message History`
    
    
    let MessageData = (
        <div>
            <p className="MessageFeedTitle">{TitleContent}</p>
            {props.messageFeed.map(item=> (
            <div><strong>{item.name}</strong> {item.time}   
            <div>
                <p style={{border:'gray', borderStyle:'solid', borderRadius:'5px'}}>{item.message}</p>
                </div>
            </div>
            ))}
        </div>
        
    )
    return MessageData
}

export default MessageFeed