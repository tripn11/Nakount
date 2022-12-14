import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getDatabase, set, ref, onValue, get, push, update, remove } from "firebase/database";


// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   })


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN,
  projectId:process.env.FIREBASE_PROJECT_ID,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.FIREBASE_APP_ID,
  measurementId:process.env.FIREBASE_MEASUREMENT_ID
};



export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();


















// const writeData = (obj) => {
//     set(ref(database, 'users/'),obj)
// }
// writeData({name:"Noble",lname:"Nwala"});

// const readData = () => {
//     onValue(ref(database, 'users'), (snapshot)=>{ //onValue listens for changes in the db and returns new values
//         console.log(snapshot.val()) //snapshot.exists() returns a boolean whether the snapshot exist or not
//     })
// }
// readData();

// const readJustOnce = () => {
//     get(ref(database, 'users'))
//         .then((snapshot)=>{ //alternative way instead of just writing it as the next parameter of get
//             console.log(snapshot.exists())
//             console.log(snapshot.val())
//         })
// }
// readJustOnce();

// const pushData = (obj) => {
//     push(ref(database, 'users/slim'),obj) //push places the obj as the grandchild of slim, the direct child is the auto generated id for the child called key
//     //const keyRetriever = push(ref(database, 'users/slim'),obj) //this can be used alternatively, it would still push, but would return an object containing the key
//     //const key = keyRetriever.getKey() //this returns the key string
// }
// pushData({name:"goodness",lname:"ogban"})
///////////ALTERNATIVELY WHICH ACTUALLY WORKS//////////////////////
// push(ref(database, `Users/slim`), obj)
//             .then((result)=>{
//                 addIncomeDispatch({...income, id:result.key})
//             }
//         )


// const updateData = (updates, key) {
// update(ref(database,'users/'+key),updates) 
// }
// updateData({lname:"precious"}, "123456")

// to remove data simply set the data with null or 
// set(ref(database, 'users/Noble'),{age:23,height:180})
// const locate = ref(database, 'users/Noble')
// remove(locate); //call remove and pass in the ref as a parameter.
