function UserData(props){
    let userData = props.activeUsers ? (
        <div className="UserData">
            <p className="UserDataTitle">ONLINE NOW</p>
            <div className="UserDataNames">
                {props.activeUsers.map(item=>(<p>🟢{item}</p>))}


            </div>

            

        </div>
    ) : null;

        // console.log(userData)
    return (
        <div> {userData}
                        </div>)
}

export default UserData