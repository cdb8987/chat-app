import { useState } from "react"


function Conversations(){
    let [value, SetValue] = useState('')

    const handleChange = (event)=>{
        SetValue(event.target.value);
        console.log(value)
    }
    return (
        <div className="Conversations">
            <p className="ConversationsTitle">Conversations</p>
            <form ConversationsonSubmit={()=>{console.log('Username Entered')}}>
                <label>Select User:</label>
                
                <input onChange={handleChange}></input>
                <input type="submit" onClick={()=>{sessionStorage.setItem('RecipientUsername', value )}}></input>
            </form>
        </div>
        
    )
}

export default Conversations

 