function ChannelList(props){
    return (
        <div classname="channellist">
            {props.channels.map(item=> (
            <div><button type="button" class="btn btn-outline-dark" onClick={()=> {props.updateChannelId(item[0]); props.updateMessageFeed(); console.log('setChannelID executed with value:', item[0]); console.log('channelID in sessionstorage is:', sessionStorage.getItem('channelId')); }}>{item[1]} </button>  
            
            </div>
            ))}
        </div>
    )
}
export default ChannelList