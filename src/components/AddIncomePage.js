import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, push } from 'firebase/database';
import { database } from '../Firebase/firebase';
import Form from "./Form";
import { addIncome } from "../Reducers/recordsReducer";


export const AddIncomePage = (props) => {
    const navigate = useNavigate();
    const addIncomeDispatch = props.dispatchAddIncome


    const actions = (income) => {
        push(ref(database, `Users/${props.userID}/Incomes`), income)
            .then((result)=>{
                addIncomeDispatch({...income, id:result.key})
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
    dispatchAddIncome: (income)=>dispatch(addIncome(income))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomePage)