import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ExpensePage from "./ExpensePage";
import { newToOld, oldToNew, ascending, descending, setWord } from '../Reducers/filtersReducer';
import sorter from "../sorter/sorter";

const ExpensesPage = (props) => { 
    const sortChange = (e) => {
        switch(e.target.value){
            case "ascending" :
                props.dispatchAscending();
                break;                     //so that it won't keep running to the next case.
            case "descending" :
                props.dispatchDescending();
                break;
            case "oldToNew" :
                props.dispatchOldToNew();
                break;
            case "newToOld" :
                props.dispatchNewToOld();
                break;
            default: 
                return     //nothing should happen when neither of the above occurs
        }
    }


    const searchChange = (e) => {
        props.dispatchSetWord(e.target.value.toLowerCase());
    }

    const fakeExpenses = [...props.state.records.expenses]; //i had to create a fake or copy of the states because sort tries to mutate the state which is not allowed and throws an error
    const visibleExpenses = sorter(fakeExpenses, props.state.filters)


    return (
    <div>
        <h2>Expenses</h2>
        <input 
            placeholder="Search Expenses"
            value={props.state.filters.searchedWord}
            onChange = { searchChange } 
        />
        <Link to="/addExpense"><button >Add Expense</button></Link>
        <label htmlFor="sortExpensesBy">Sort Expenses by:</label>
        <select 
            id="sortIncomesBy" 
            name="sortIncomesBy"
            value={props.state.filters.sortBy}
            onChange={sortChange}>
            <option value='oldToNew'>Date(Oldest to Newest)</option>
            <option value='newToOld'>Date(Newest to Oldest)</option>
            <option value='ascending'> Amount(Ascending Order)</option>
            <option value='descending'>Amount(Descending Order)</option>
        </select>
        <p>List of Expenses</p>
        {visibleExpenses.length > 0 ?
            visibleExpenses.map( (expense, index) =>(
                <ExpensePage key={expense.id} expense = {expense} index = {index} />
            )): <p>No expense yet</p> 
        }       
    </div>
)}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = (dispatch) => ({
    dispatchNewToOld: ()=>dispatch(newToOld()),
    dispatchOldToNew: ()=>dispatch(oldToNew()),
    dispatchAscending: ()=>dispatch(ascending()),
    dispatchDescending: ()=>dispatch(descending()),
    dispatchSetWord: (word)=>dispatch(setWord(word))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPage)
