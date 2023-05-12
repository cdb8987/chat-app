import { useState } from "react"


function Conversations(props){
    let [value, SetValue] = useState('')

    const handleChange = (event)=>{
        SetValue(event.target.value);
        console.log(value)
    }
    console.log('the retrieve users function is', props.retrieveUserList)
    props.retrieveUserList()
    .then((result) => {console.log('the result of retreive user function is ', result)
        return (
            <div className="Conversations">
                <p className="ConversationsTitle">Conversations</p>
                <select>
                {result.map(item=> (<option>{item}</option>))}
                </select>
    
                <form ConversationsonSubmit={()=>{console.log('Username Entered')}}>
                    <label>Select User:</label>
                    
                    <input onChange={handleChange}></input>
                    <input type="submit" onClick={()=>{sessionStorage.setItem('RecipientUsername', value )}}></input>
                </form>
            </div>
            
        )
    }
    )}


    

export default Conversations

 