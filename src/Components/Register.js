const Register = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        props.createAcc(event.target[0].value, event.target[1].value);
        event.target[0].value = ''; 
        event.target[1].value = '';
    }
  
return (
<div className="registeren" id='registeren'>
    <div className='registeren-container' id='registeren-container'>
        <h2>Maak een account aan</h2>
        <p style={{color: "red"}}>* Let op: jantje@hotmail(dot)com of jantje@jantje(dot).com is voldoende, email wordt opgeslagen via google maar niet geverifieerd.</p>
        <p style={{color: "red"}}>* Let op: verzin ook een leuke wachtwoord.</p>
    <form className='registeren-form' id='registeren-form' onSubmit={handleSubmit}>
        <label htmlFor="Email" className='labelRegisteren'>Email:</label><br></br>
        <input type="Email" id="Email" name="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required></input><br></br>

        <label htmlFor="Password" className='labelRegisteren'>Password:</label><br></br>
        <input type="password" id="Password" name="Password" minLength='6' title='Password minimum length is 6'></input><br></br>

        <input type='submit' value='Registeren'></input>
        </form>
        <p>{props.errorMsg}</p>
    </div>
</div>
);
};
    
export default Register;