import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IncomePage from "./IncomePage";
import { newToOld, oldToNew, ascending, descending, setWord } from '../Reducers/filtersReducer';
import sorter from "../sorter/sorter";

const IncomesPage = (props) => { 
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

    const fakeIncomes = [...props.state.records.incomes]; //i had to create a fake or copy of the states because sort tries to mutate the state which is not allowed and throws an error
    const visibleIncomes = sorter(fakeIncomes, props.state.filters)


    return (
    <div>
        <h2>Incomes</h2>
        <input 
            placeholder="Search Incomes"
            value={props.state.filters.searchedWord}
            onChange={searchChange}/>
        <Link to="/addIncome"><button >Add Income</button></Link>
        <label htmlFor="sortIncomesBy">Sort Incomes by:</label>
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
        <p>List of Incomes</p>
        {visibleIncomes.length > 0 ?
            visibleIncomes.map( (income, index) =>(
                <IncomePage key={income.id} income={income} index = {index} />
            )): <p>No income yet</p> 
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

export default connect(mapStateToProps, mapDispatchToProps)(IncomesPage)

// "/addIncome means from the root of the folder or server while "addIncome" would just append it to current url"