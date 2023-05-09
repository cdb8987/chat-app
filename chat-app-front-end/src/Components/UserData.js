function UserData(props){
    console.log('props.activeusers is:', props.activeUsers);
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