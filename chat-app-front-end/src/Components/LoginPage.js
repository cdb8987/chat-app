
function LoginPage(props){
    
    return (
        <div className="page">
            <div className="pagediv">
                <div className="container p-3 my-3 border" style={{textAlign: 'center'}}>
                    <h1>Welcome to my Chat App!</h1>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', height: '70%'}}>
                    <p> Username:  <input type="text" name="Username"/></p>                                    
                    <p> Password:  <input type="text" name="Password"/></p>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                        <button className="btn btn-primary" onClick={()=>{console.log('Log in Clicked!', props.updatelogin(true))}}>LOG IN</button>
                        <p style={{paddingTop: '15px', paddingLeft: '20px', paddingRight: '20px'}}>   OR   </p>
                        <button className="btn btn-outline-primary" onClick={()=>{console.log('Sign Up Clicked!')}}>SIGN UP</button>
                </div>
                </div>
                
                
            </div>
            


            
        </div>
    )
}

export default LoginPage