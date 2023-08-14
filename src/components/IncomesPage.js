import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IncomePage from "./IncomePage";
import { newToOld, oldToNew, ascending, descending, setWord } from '../Reducers/filtersReducer';
import sorter from "../sorter/sorter";
import logo from '../Images/logo.png';
import LoadingPage from "./LoadingPage";


const IncomesPage = () => { 
    const myState = useSelector(state=>state)
    const loadingState = useSelector(state=>state.auth.loading)

    const dispatch = useDispatch();

    const sortChange = (e) => {
        switch(e.target.value){
            case "ascending" :
                dispatch(ascending());
                break;                     //so that it won't keep running to the next case.
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
                return     //nothing should happen when neither of the above occurs
        }
    }


    const searchChange = (e) => {
        dispatch(setWord(e.target.value.toLowerCase()));
    }

    const fakeIncomes = [...myState.records.incomes]; //i had to create a fake or copy of the states because sort tries to mutate the state which is not allowed and throws an error
    const visibleIncomes = sorter(fakeIncomes, myState.filters)


    return (
    <div className="details-page">
        <img src={logo} alt="logo"/>
        <h2>Incomes</h2>
        <Link to="/addIncome" className="add-detail"><button>Add Income</button></Link>
        <div>
            <input 
                placeholder="Search Incomes"
                value={myState.filters.searchedWord}
                onChange={searchChange}
            />
            <div>
                <label htmlFor="sortIncomesBy">Sort Incomes by:</label>
                <select 
                    name="sortIncomesBy"
                    value={myState.filters.sortBy}
                    onChange={sortChange}>
                    <option value='oldToNew'>Date(Oldest to Newest)</option>
                    <option value='newToOld'>Date(Newest to Oldest)</option>
                    <option value='ascending'> Amount(Ascending Order)</option>
                    <option value='descending'>Amount(Descending Order)</option>
                </select>
            </div>
        </div>
        
        <h3>List of Incomes</h3>
        {loadingState ? <LoadingPage /> :<div className="records-list">
            {visibleIncomes.length > 0 ?
                visibleIncomes.map( (income, index) =>(
                    <IncomePage key={income.id} income={income} index = {index} />
                )): <p>No income yet</p> 
            }
        </div>}
    </div>
)}

export default IncomesPage;

// "/addIncome means from the root of the folder or server while "addIncome" would just append it to current url"