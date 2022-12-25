import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, push } from 'firebase/database';
import { database } from '../Firebase/firebase';
import Form from "./Form";
import { addIncome } from "../Reducers/recordsReducer";
import { setLoading } from "../Reducers/authReducer";


export const AddIncomePage = (props) => {
    const navigate = useNavigate();
    const addIncomeDispatch = props.dispatchAddIncome


    const actions = (income) => {
        props.dispatchSetLoading(true);
        push(ref(database, `Users/${props.userID}/Incomes`), income)
            .then((result)=> {
                addIncomeDispatch({...income, id:result.key})
                props.dispatchSetLoading(false)
                navigate("/incomes");
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
    dispatchAddIncome: (income)=>dispatch(addIncome(income)),
    dispatchSetLoading:(loading) => dispatch(setLoading(loading))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomePage)