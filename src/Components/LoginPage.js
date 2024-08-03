const LoginPage = (props) => {

    const handleRender = () => {
        if (props.currentUser !== null) {
            let userName = props.currentUser.displayName || 'new user';
            return (
                <h1>Welcome {userName}!</h1>
            )
        } else {
            return (
                <div className='login-container' id='login-container'>
                <h2>Login</h2>
                <p>Nog geen account? Maak <a href='/registreren'>hier</a> een account aan!</p>
            <form className='login-form' id='login-form' onSubmit={handleSubmit}>
                <label htmlFor="Email" className='labelLogin'>Email:</label><br></br>
                <input type="Email" id="Email" name="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required></input><br></br>
        
                <label htmlFor="Password" className='labelLogin'>Password:</label><br></br>
                <input type="password" id="Password" name="Password" minLength='6' title='Password minimum length is 6'></input><br></br>
        
                <input type='submit' value='Login'></input>
                </form>
                <p>{props.errorMsg}</p>
            </div>
            )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.login(event.target[0].value, event.target[1].value);
        event.target[0].value = ''; 
        event.target[1].value = '';
    }
  
return (
<div className="login" id='login'>
    {handleRender()}
</div>
);
};
    
export default LoginPage;