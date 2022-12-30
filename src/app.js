import "core-js/stable"; //to replace babel/polyfill
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store'
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/style.scss';
import AppRouter from './routers/AppRouter';
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from 'firebase/database';
import { auth, database } from './Firebase/firebase';
import { setIncomes, setExpenses } from './Reducers/recordsReducer';
import { setLoading, setUserDetails } from "./Reducers/authReducer";
import LoadingPage from './components/LoadingPage';


const App = ()=> {    
    return store.getState().auth.loading ? <LoadingPage /> : (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

const root = createRoot(document.getElementById('app')); 



root.render(<App />)


onAuthStateChanged(auth, (user) => {
    const incomes = [];
    const expenses = []

    if (user) {
        get(ref(database, `Users/${user.uid}/Incomes`))
            .then((snapshot)=>{
                snapshot.forEach((child)=>{incomes.push({...child.val(),id: child.key})})
                store.dispatch(setIncomes(incomes))
                store.dispatch(setUserDetails({uid:user.uid, name:user.displayName}))
                store.dispatch(setLoading(false));
                root.render(<App />)
            }
        )
        get(ref(database, `Users/${user.uid}/Expenses`))
            .then((snapshot)=>{
                snapshot.forEach((child)=>{expenses.push({...child.val(),id: child.key})})
                store.dispatch(setExpenses(expenses))
                store.dispatch(setLoading(false));
                root.render(<App />)
            }
        )
    } else {
        store.dispatch(setLoading(false))
        root.render(<App />)
    } 
})

// let hasRendered = false; //to reduce the frequency of rendering so that it renders only once per loading from server
// const render = () => { //this preserves the login status
//     if(!hasRendered) {
//         root.render(<App />)
//         hasRendered = true
//     }
// }