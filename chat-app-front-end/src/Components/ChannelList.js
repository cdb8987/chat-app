function ChannelList(props){
    return (
        <div className="Channels">
            <p className="ChannelsTitle">Channels</p>
            {props.channels.map(item=> (
            <div><button type="button" class="btn btn-outline-dark" onClick={()=> {props.updateChannelId(item[0]); props.updateMessageFeed(); console.log('setChannelID executed with value:', item[0]); console.log('channelID in sessionstorage is:', sessionStorage.getItem('channelId')); sessionStorage.setItem('ChannelName', item[1])}}>{item[1]} </button>  
            
            </div>
            ))}
        </div>
    )
}
export default ChannelList