
function Conversations(){

    return (
        <form onSubmit={()=>{console.log('Username Entered')}}>
            <label>Recipient:</label>
            <input></input>
            <input type="submit"></input>
        </form>
        
    )
}

export default Conversations

 