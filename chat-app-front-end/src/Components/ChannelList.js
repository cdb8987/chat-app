function ChannelList(props){
    if(!props.channels.length > 0){
        return
    }
    if(typeof props.channels === 'undefined'){
        return
    }
    return (
        <div className="Channels">
            <p className="ChannelsTitle">Channels</p>
            {props.channels.map(item=> (
            <div><button type="button" className="btn btn-light" onClick={()=> {props.updateChannelId(item[0]); props.updateMessageFeed(); sessionStorage.setItem('ChannelName', item[1])}}>#{item[1]} </button>  
            
            </div>
            ))}
        </div>
    )
}
export default ChannelList