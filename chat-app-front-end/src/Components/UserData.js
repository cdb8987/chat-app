function UserData(props){
    if(!props.activeUsers.length > 0){
        return
    }
    if(typeof props.activeUsers === 'undefined'){
        return
    }
    
    
    let userData = props.activeUsers ? (
        <div className="UserData">
            <p className="UserDataTitle">ONLINE NOW</p>
            <div className="UserDataNames">
                {props.activeUsers.map(item=>(<p>🟢{item}</p>))}


            </div>

            

        </div>
    ) : null;

    return (
        <div> {userData}
                        </div>)
}

export default UserData