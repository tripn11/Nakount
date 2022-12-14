import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ref, update } from "firebase/database";
import { database } from "../Firebase/firebase";
import Form from "./Form";
import { editIncome } from "../Reducers/recordsReducer";

export const EditIncomePage = (props) => {
    const navigate = useNavigate();
    const { id } = useParams()
    const editIncomeDispatch = props.dispatchEditIncome

    const fillForm = ()=>{
        const selected = props.state.records.incomes.filter( (income)=> income.id === id )
        return selected[0]
    }

    const selectedIncome = fillForm()

    const actions = (income) => {
        update(ref(database, `Users/${props.state.auth.uid}/Incomes/${id}`), income)
            .then(()=>{
                editIncomeDispatch({...income,id})
                navigate("/incomes")
            }
        )
    }
    
    return (
        <div>
            <Form actions={actions} selected={selectedIncome} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = (dispatch) => ({
    dispatchEditIncome: (income)=>dispatch(editIncome(income))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditIncomePage)