function UserData(props){
    let userData = props.activeUsers ? (
        <div>
            {props.activeUsers.map(item=>(<p>🟢{item}</p>))}
        </div>
    ) : null;

        console.log(userData)
    return (
        <div className="userdata"> {userData}
                        </div>)
}

export default UserData