import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './styles/header.css'

const Header = (props) => {

    const [display, setDisplay] = useState('none');
    const [isMobile, setIsMobile] = useState(false);
    const [mobDisplay, setMobDisplay] = useState('none');

    useEffect(() => {
        if (props.loggedIn) {
            console.log('User is logged in');
        }
  }, [props.loggedIn]);

    useEffect(() => {
        handleResize();
    },[]);

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }
  
  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  // handles computer/mobile header styling
    const handleScreen = () => {
        if (!isMobile) {
            return (
                <ul className="nav-links" id='nav-links'>
                    <Link to='/'><li>Home</li></Link>
                </ul>
            )
        } else if (isMobile) {
            return (
                <div className='mobile' id='mobile' onClick={renderDisplay}>
                    <ul className="mobile-links" id='mobile-links' style={{ 'display': mobDisplay}}>
                        <Link to='/'><li id='mobile-link'>Home</li></Link>
                </ul>
                </div>
            )
        }

    }

    // handles display for mobile navigation in header
    const renderDisplay = () => {
        if (mobDisplay === 'none') {
            setMobDisplay('block');
        } else {
            setMobDisplay('none');
        }
    }

    // checks is user is logged in, shows Logo + 'sign out' btn or 'login' btn
    const handleLogin = () => {
        // if (props.currentUser !== null) {
            if (props.loggedIn) {
            if (display !== 'block') {
                setDisplay('block');
            }
            return (
                <div className='header-profile' id='header-profile'>
                <Link to='/profile'>
                    <img className='header-profile-logo' id='header-profile-logo' alt='profile' src={props.getProfilePicture()} style={{ 'display': display}}></img>
                </Link>
                <p>{props.currentUser.displayName || "user"}</p>
                <button className='log-outBtn' onClick={() => {props.signOut();}} style={{ 'display': display }}>Log uit</button>
            </div>
            )
        } else if (!props.loggedIn) {
            return (
                <div className='header-profile' id='header-profile'>
                <Link to='/login'>
                    <ul className='nav-links' id='nav-links'>
                        <li>Login</li>
                    </ul>
                </Link>
                <Link to='/registreren'>
                    <ul className='nav-links' id='nav-links'>
                        <li>Signup</li>
                    </ul>
                </Link>
                </div>
            )
        }
    }
  
return (
<div className="header" id='header'>
    <nav className='nav' id='nav'>
    <Link to='/'>
    <h3 className='logo' id='logo'>AE</h3>
    </Link>
    {handleScreen()}
    {handleLogin()}
    </nav>
</div>
);
};
    
export default Header;