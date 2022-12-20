import React from "react";
import { signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { provider, auth } from '../Firebase/firebase';
import { set, ref } from 'firebase/database';
import { database } from '../Firebase/firebase';
import fullLogo from '../Images/fullLogo.png'
// import leopard from '../Images/leopard.jpg'; //just showing how to display a picture.whereever the picture is needed just type "<img src={leopard} />.it would display"

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

export default () => {
    const navigate = useNavigate();

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                set(ref(database,`Users/${result.user.uid}/Name`), result.user.displayName)
                navigate('/');
            }
        )
    }

    return (
        <div>
            <img className = "header-logo" id="login-logo" src={fullLogo} alt="logo" />
            <p id="intro">Welcome to Nakant, where your money never disappears</p>
            <button onClick={login} id="login-button">Login with Google</button>
        </div>   
    )
}