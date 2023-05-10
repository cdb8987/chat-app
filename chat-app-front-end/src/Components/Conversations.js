import { useState } from "react"


function Conversations(){
    let [value, SetValue] = useState('')

    const handleChange = (event)=>{
        SetValue(event.target.value);
        console.log(value)
    }
    return (
        <form onSubmit={()=>{console.log('Username Entered')}}>
            <label>Recipient:</label>
            <input onChange={handleChange}></input>
            <input type="submit" onClick={()=>{sessionStorage.setItem('RecipientUsername', value )}}></input>
        </form>
        
    )
}

export default Conversations

 