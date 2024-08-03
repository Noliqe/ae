const Profile = (props) => {

    const handleRender = () => {
        if (props.currentUser !== null) {
            let userName = props.currentUser.displayName || 'new user';
            return (
                <div className='profile-welcome' id='profile-welcome'>
                    <h1>Welcome {userName}!</h1>
                    <form className='profile-cname-form' onSubmit={changeProfileName}>
                        <div className='profile-cname-container'>
                            <label htmlFor="cname">Verander je profielnaam:</label><br></br>
                            <input type="text" id="cname" name="cname" maxLength="12" titel='Maximaal 12 letters.'></input><br></br>    
                        </div>
                    <input type='submit' className='profile-cname-submit' id='profile-cname-submit'></input>
                    </form>
                    <p style={{color: "grey"}}>{props.updateInfoMsg}</p>
                    <form className='profile-cphoto-form' onSubmit={changeProfilePhoto}>
                        <div className='profile-cphoto-container'>
                            <label htmlFor="cphoto">Verander je profielfoto:</label><br></br>
                            <input type="text" id="cphoto" name="cphoto"></input><br></br>    
                        </div>
                    <input type='submit' className='profile-cphoto-submit' id='profile-cphoto-submit'></input>
                    </form>
                    <p style={{color: "red"}}>* Let op: geef foto url door!</p>
                    <p className='profile-photo-err-msg' id='profile-photo-err-msg' style={{color: "grey"}}>{props.updatePhotoMsg}</p>
                </div>
            )
        } else {
            return (
                <div className='profile-subcontainer'>
                <h1>Something went wrong!</h1>
            </div>
            )
        }
    }

    const changeProfileName = (event) => {
        event.preventDefault()
        props.updateProfileName(event.target[0].value);
        event.target[0].value = '';
    }

    const changeProfilePhoto = (event) => {
        event.preventDefault()
        if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(event.target[0].value)) {
            props.updateProfilePhoto(event.target[0].value); 
        } else {
            props.updateProfilePhoto('error'); 
        }
        event.target[0].value = ''; 
    }


return (
<div className="profile" id='profile'>
    <div className='profile-container' id='profile-container'>
    {handleRender()}
    </div>
</div>
);
};
    
export default Profile;