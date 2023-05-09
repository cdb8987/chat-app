function MessageFeed(props){
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
    return MessageData
}

export default MessageFeed