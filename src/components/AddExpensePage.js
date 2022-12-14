import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, push } from 'firebase/database';
import { database } from '../Firebase/firebase';
import Form from "./Form";
import { addExpense } from "../Reducers/recordsReducer";


export const AddExpensePage = (props) => {
    const navigate = useNavigate();
    const addExpenseDispatch = props.dispatchAddExpense


    const actions = (expense) => {
        push(ref(database, `Users/${props.userID}/Expenses`), expense)
            .then((result)=>{
                addExpenseDispatch({...expense, id:result.key})
                navigate("/expenses");
            }
        )
    }
    
    return (
        <div>
            <Form actions={actions}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userID : state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    dispatchAddExpense: (expense)=>dispatch(addExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage)