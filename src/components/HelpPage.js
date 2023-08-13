import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { push, ref } from "firebase/database";
import { database } from "../Firebase/firebase";
import { setStateMessage } from "../Reducers/authReducer";
import Logout from "./Logout";

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
        <div id="help-page">
            <h1>User Guide: Financial Summary and Management</h1>
            <ul>
                <li>The Home page functions as your financial hub, delivering a succinct presentation of both 
                    Incomes and Expenses, culminating in the precise net Income figure.</li>
                <li>By default, the application employs a time frame extending from the first day to the current date 
                    of the month. This strategic approach facilitates rapid assessment of your monthly financial status.
                    </li>
                <li>Use the integrated date picker on the Home page to customize your time range and analyze financial 
                    trends over specific periods.</li>
                <li>Seamlessly document your financial endeavors using the dedicated "Add Income" or "Add Expense" 
                    buttons. These intuitive features streamline the process of inputting your financial data.</li>
                <li>Garner clarity from your data through the employment of the available sorting options. 
                    Organize transactions based on their monetary value or the dates of their occurrence, 
                    enhancing your data analysis endeavors.</li>
                <li>A highly efficient search bar empowers you to promptly locate specific items by scrutinizing their 
                    descriptions. This capability simplifies the task of identifying individual transactions within 
                    your meticulously managed records.</li>
                <li>Expand your transactional understanding by clicking on each transaction. Access supplementary 
                    details, including the transaction date and any appended notes, contributing to a holistic 
                    transactional perspective.</li>
                <li>When circumstances demand, leverage the Delete button to meticulously eliminate selected items 
                    from your records. This straightforward process ensures the utmost accuracy in your data 
                    management efforts.</li>
            </ul>
            <p>We appreciate your selection of our financial management web application. Armed with these advanced 
                features, you possess the tools needed to uphold a lucid and organized perspective on your financial 
                undertakings. Should queries arise or assistance be required, our dedicated support team is on standby 
                to address any further inquiries you may have.</p>
            <p>Your reviews are appreciated. You can also financially support the developers. 
                Just request for details below
            </p>

            <div id="response">
                <textarea 
                    value={message}
                    onChange={messageChange}
                    id="feedback"
                />
                
                <button onClick={onSubmit}>Submit</button>
            </div>
            

            
            <Logout />
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