import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExpensePage from "./ExpensePage";
import { newToOld, oldToNew, ascending, descending, setWord } from '../Reducers/filtersReducer';
import sorter from "../sorter/sorter";

const ExpensesPage = () => { 
    const myState = useSelector(state=>state)
    const dispatch = useDispatch();

    const sortChange = (e) => {
        switch(e.target.value){
            case "ascending" :
                dispatch(ascending());
                break;                  
            case "descending" :
                dispatch(descending());
                break;
            case "oldToNew" :
                dispatch(oldToNew());
                break;
            case "newToOld" :
                dispatch(newToOld());
                break;
            default: 
                return     
        }
    }


    const searchChange = (e) => {
        dispatch(setWord(e.target.value.toLowerCase()));
    }

    const fakeExpenses = [...myState.records.expenses]; 
    const visibleExpenses = sorter(fakeExpenses, myState.filters)


    return (
    <div className="details-page">
        <h2>Expenses</h2>
        <Link to="/addExpense" className="add-detail"><button>Add Expense</button></Link>
        <div>
            <input 
                placeholder="Search Expenses"
                value={myState.filters.searchedWord}
                onChange={searchChange}
            />
            <div>
                <label htmlFor="sortExpensesBy">Sort Expenses by:</label>
                <select 
                    name="sortExpensesBy"
                    value={myState.filters.sortBy}
                    onChange={sortChange}>
                    <option value='oldToNew'>Date(Oldest to Newest)</option>
                    <option value='newToOld'>Date(Newest to Oldest)</option>
                    <option value='ascending'> Amount(Ascending Order)</option>
                    <option value='descending'>Amount(Descending Order)</option>
                </select>
            </div>
        </div>
        
        <h3>List of Expenses</h3>
        <div className="records-list">
            {visibleExpenses.length > 0 ?
                visibleExpenses.map( (expense, index) =>(
                    <ExpensePage key={expense.id} expense={expense} index = {index} />
                )): <p>No expense yet</p> 
            }
        </div>
    </div>
)}

export default ExpensesPage;