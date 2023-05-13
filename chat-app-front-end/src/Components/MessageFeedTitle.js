export default function MessageFeedTitle(){
    let TitleContent;
    TitleContent = (sessionStorage.getItem('LeftContainerComponentSelect')==='Channels') ?`#${sessionStorage.getItem('ChannelName')}` : `Message History: ${sessionStorage.getItem('FriendUsername')}`

    return <p className="MessageFeedTitle">{TitleContent}</p>
}