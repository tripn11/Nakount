import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ref, update } from "firebase/database";
import { database } from "../Firebase/firebase";
import Form from "./Form";
import { editExpense } from "../Reducers/recordsReducer";
import { setLoading } from "../Reducers/authReducer";

export const EditExpensePage = (props) => {
    const navigate = useNavigate();
    let { id } = useParams()
    const editExpenseDispatch = props.dispatchEditExpense

    const fillForm = ()=>{
        const selected = props.state.records.expenses.filter( (expense)=> expense.id === id )
        return selected[0]
    }

    const selectedExpense = fillForm()

    const actions = (expense) => {
        props.dispatchSetLoading(true);
        update(ref(database, `Users/${props.state.auth.uid}/Expenses/${id}`), expense)
            .then(()=>{
                editExpenseDispatch({...expense, id});
                props.dispatchSetLoading(false)
                navigate("/expenses");
            })
    }
    
    return (
        <div>
            <Form actions={actions} selected={selectedExpense} type='Expense'/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = (dispatch) => ({
    dispatchSetLoading:(loading) => dispatch(setLoading(loading)),
    dispatchEditExpense: (expense)=>dispatch(editExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)