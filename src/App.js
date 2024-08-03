import './App.css';
import { getFirebaseConfig } from './firebase-config';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile } from "firebase/auth";
import { upload } from '@testing-library/user-event/dist/upload';
import Header from './Components/Header';
import Home from './Components/Home';
import LoginPage from './Components/LoginPage';
import Register from './Components/Register';
import Profile from './Components/Profile';
import TenWords from './Components/TenWords';

const db = getFirestore();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accError, setAccError] = useState('');
  const [updateInfoMsg, setUpdateInfoMSg] = useState('');
  const [updatePhotoMsg, setUpdatePhotoMSg] = useState('');

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const auth = getAuth();
  const getLoginForm = (email, password) => {
      // createUserWithEmailAndPassword(auth, email, password)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    setAccError('Succesfully created an account!');
    signUserIn(email, password);
    const user = userCredential.user.uid;
    // var userUid = auth.currentUser.uid;
    // console.log(user);
    // console.log(userUid);
    addUserToF(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/email-already-in-use') {
      console.log('auth/email-already-in-use.');
      setAccError('auth/email-already-in-use, try again with another email.');
    } else {
      console.log(errorMessage);
    console.log('Error code: ', errorCode);
    console.log('Error Message: ', errorMessage);
    console.log('Error: ', error);
    }
  });
  }
  // await addDoc(collection(getFirestore(), 'users'), {
  async function addUserToF(userUid) {
    try {
      await addDoc(collection(db, "users", userUid, 'diezPalabras'), {
        "palabras": {
          "primero": ["eerste", "primero"],
          "segundo": ["tweede", "segundo"],
          "tercero": ["derde", "tercero"],
          "cuarto": ["vierde", "cuarto"],
          "quinto": ["vijfde", "quinto"],
          "sexto": ["zesde", "sexto"],
          "séptimo": ["zevende", "séptimo"],
          "octavo": ["achtste", "octavo"],
          "noveno": ["negende", "noveno"],
          "décimo": ["tiende", "décimo"]
        },
        Timestamp: serverTimestamp()
      })
    }
    catch(error) {
      console.error('Error writing user to Firebase Database', error);
    }
  }

  const signUserIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setAccError('Succesfully signed in!');
      const user = userCredential.user;
      if (!loggedIn) {
        setLoggedIn(true);
      }
      checkLoggedIn();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        console.log('auth/wrong-password.');
        setAccError('Verkeerde wachtwoord, probeer opnieuw.');
      } else if (errorCode === 'auth/user-not-found') {
        setAccError('Email niet bekend, probeer opnieuw.');
      } else {
        console.log('Error code: ', errorCode);
        setAccError(errorCode);
        console.log('Error Message: ', errorMessage);
        console.log('Error: ', error);
      }
    })
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      if (loggedIn) {
        setLoggedIn(false);
      }
      // checkLoggedIn();
      // Sign-out successful.
      setAccError('');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
  const checkLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // let profilePicUrl = getProfilePicUrl();
        setLoggedIn(true);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  // Returns the signed-in user's profile Pic URL.
  function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
}

const updateProfileName = (info) => {
  updateProfile(auth.currentUser, {
    displayName: info
  }).then(() => {
    // Profile updated!
    setUpdateInfoMSg('Profile name updated! Reload page if needed.');
  }).catch((error) => {
    // An error occurred
    console.log(error);
    setUpdateInfoMSg('Something went wrong!')
  });
}

const updateProfilePhoto = (info) => {
if (info === 'error') {
  return setUpdatePhotoMSg('Oeps, er is wat fout gegaan! Gebruik een foto url, rechtermuis knop op een afbeelding van het internet en "copy image adress"');
}
updateProfile(auth.currentUser, {
  photoURL: info
}).then(() => {
  // Profile updated!
  setUpdatePhotoMSg('Profile photo updated! Reload page if needed.');
  console.log('Profile photo updated!')
}).catch((error) => {
  // An error occurred
  console.log(error);
  setUpdatePhotoMSg('Something went wrong!')
});
}

  return (
    <BrowserRouter>
    <Header currentUser={auth.currentUser} signOut={signUserOut} getProfilePicture={getProfilePicUrl} loggedIn={loggedIn}/>
  <Routes>
    <Route path="/" element={<Home currentUser={auth.currentUser} />} />
    <Route path="/login" element={<LoginPage login={signUserIn} errorMsg={accError} currentUser={auth.currentUser}/>} />
    <Route path="/registreren" element={<Register createAcc={getLoginForm} errorMsg={accError}/>} />
    <Route path="/profile" element={<Profile currentUser={auth.currentUser} updateProfileName={updateProfileName} updateProfilePhoto={updateProfilePhoto}
    updateInfoMsg={updateInfoMsg} updatePhotoMsg={updatePhotoMsg}/>} />
    <Route path="/diez-palabras" element={<TenWords currentUser={auth.currentUser}/>} />
  </Routes>
  <div className='footer'>
  </div>
</BrowserRouter>
  );
}

export default App;
