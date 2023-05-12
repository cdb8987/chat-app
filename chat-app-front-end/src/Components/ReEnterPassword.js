export default function ReEnterPassword(props){
    
    if(props.displayReEnterPassword){
        
        return (
        <p className='Reenterpassword'> Re-Enter:  <input type="password" id="reenterpassword" name="reenterpassword" 
value={props.reenterPassword} onChange={(e) => props.setReenterPassword(e.target.value)} required/></p>
    )}
    return null
    
}