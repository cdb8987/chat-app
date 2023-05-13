import { useState } from "react"


function Conversations(props){
    // let [value, SetValue] = useState('')

    // const handleChange = (event)=>{
    //     SetValue(event.target.value);
    //     console.log(value)
    // }
    // console.log('the retrieve users function is', props.retrieveUserList)
    return props.retrieveUserList()
    }


    

export default Conversations

 