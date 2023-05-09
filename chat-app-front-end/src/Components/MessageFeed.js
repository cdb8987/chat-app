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
    return (
        <div className="messagefeed" style={{flexBasis: '66.66%'}}>
                        <div  className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                            <button className="btn btn-light">Feed</button>
                            <button className="btn btn-light">Direct Messages</button>
                        
                                <button className='btn btn-secondary' style={{float: 'right'}}onClick={()=> {props.logOut()}}>Log Out</button>
                        </div>

                        <div style={{height: '70%', overflow:'auto'}}>
                        {MessageData}
                        </div>
                        
                        <div><button className="btn btn-primary" onClick={()=> {props.writeMessage(props.sendMessageText); props.setSendMessageText(''); props.updateActiveUsers(); props.updateMessageFeed() }}  >Send Message</button><input style={{width:"100%"}}value={props.sendMessageText} onChange={(e) => props.setSendMessageText(e.target.value)} required></input></div>
                    </div>
    )
}

export default MessageFeed