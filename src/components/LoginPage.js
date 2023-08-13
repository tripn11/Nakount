import React, { useEffect, useState } from "react";
import { signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { provider, auth } from '../Firebase/firebase';
import { set, ref } from 'firebase/database';
import { database } from '../Firebase/firebase';
import logo from '../Images/logo.png';

export default () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)

    useEffect (()=> {
        setLoaded(true)
    },[])

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                set(ref(database,`Users/${result.user.uid}/Name`), result.user.displayName)
                navigate('/');
            }
        )
    }

    return (
        <div id='login-page'>
            <p className={loaded ? 'slide':''}>Welcome</p>
            <div>
                <img className = {loaded ? 'visible' : ''} src={logo} alt="logo" />
            </div>
            <p>NORDIT</p>
            <p>Track your finances with ease</p>
            <button onClick={login}>Login</button>
        </div>   
    )
}

// const provider = new GoogleAuthProvider();
// const auth = getAuth();

// const signIn = () => {
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             console.log(credential)
//             const token = credential.accessToken;
//             console.log(token)
//             // The signed-in user info.
//             const user = result.user;
//             console.log(user)
//             // ...
//         })
//     //     .catch((error) => {
//     //         // Handle Errors here.
//     //         const errorCode = error.code;
//     //         const errorMessage = error.message;
//     //         // The email of the user's account used.
//     //         const email = error.customData.email;
//     //         // The AuthCredential type that was used.
//     //         const credential = GoogleAuthProvider.credentialFromError(error);
//     //         // ...
//     // });
// }