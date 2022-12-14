import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { push, ref } from "firebase/database";
import { database } from "../Firebase/firebase";
import { setStateMessage } from "../Reducers/authReducer";

const HelpPage = (props) => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const messageChange = (e) => {
        setMessage(e.target.value)
    }

    const onSubmit = () => {
        if(message) {
            push(ref(database, `Users/${props.auth.uid}/Messages`), message)
                .then(() => props.dispatchMessage(message))
        }
        navigate('/')
    }


    return(
        <div>
            <p>Guide to use the app</p>
            <ol>
                <li>The Dashboard tab or the home page contains the summary of Incomes and Expenses and the net Income</li>
                <li>By default, the time span in consideration is the current month</li>
                <li>You can set a custom time range using the date picker available on the Dashboard page</li>
                <li>The Income and Expenses Pages are identical.</li>
                <li>The Add Income or Add Expense button is used to add an income or expense</li>
                <li>You can use the options provided to sort the data according to amount or date made</li>
                <li>Using the search bar the description could be searched to find a particular item</li>
                <li>clicking the expand button, shows more details of the item such as date and additional note made</li>
                <li>The Delete button obviously deletes the selected item</li>
            </ol>
            <p>Your reviews are appreciated. You can also request for the developer's wallet address here to support the project</p>
            <textarea 
                value={message}
                onChange={messageChange}
            />
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth:state.auth
})
const mapDispatchToProps = (dispatch) => ({
    dispatchMessage: (message) => dispatch(setStateMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage)