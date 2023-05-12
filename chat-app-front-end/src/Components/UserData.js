function UserData(props){
    let userData = props.activeUsers ? (
        <div className="UserData"><p className="UserDataTitle">ONLINE NOW</p>
            {props.activeUsers.map(item=>(<p>🟢{item}</p>))}
            <button className='btn btn-secondary' onClick={()=> {props.logOut()}}>Log Out</button>

        </div>
    ) : null;

        console.log(userData)
    return (
        <div className="userdata"> {userData}
                        </div>)
}

export default UserData