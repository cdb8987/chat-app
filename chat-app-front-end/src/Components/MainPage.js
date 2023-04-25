
function MainPage(props){
    console.log(props.UsersOnline)


    const logOut = ()=>{
        return fetch("http://127.0.0.1:5000/logout")
    }

    
    
   
    let UserData = (
        <div>
            {props.UsersOnline.map(item=>(<p>🟢{item}</p>))}
        </div>
    )
    let MessageData = (
        <div>
            {props.MessageFeed.map(item=> (
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
                    <div className="messagefeed" style={{flexBasis: '66.66%', overflow:'auto'}}>
                        <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                                MESSAGES
                                <button style={{float: 'right'}}onClick={()=> {props.updateLogin(false); logOut()}}>Log Out</button>
                        </div>
                        {MessageData}
                        <div><button className="btn btn-primary">Send Message</button><input style={{width:"100%"}}></input></div>
                    </div>
                    
                    
                </div>
                
                
            </div>  
    )
}

export default MainPage