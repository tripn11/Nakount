import React from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';
import { ref, remove } from "firebase/database";
import { database } from "../Firebase/firebase";
import { removeExpense } from "../Reducers/recordsReducer";
import { convertToSentenceCase } from "./IncomePage";


class ExpensePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display:false
    }
  }

  UNSAFE_componentWillMount() { //unsafe prefix was added to show the componentWillUnmount to show it is unsafe.
    Modal.setAppElement('body'); //to help on screen readers to know the modal is the active screen. it is required as the warning appears without this line
  } 

  open = () => {
    this.setState(()=>({display:true}));
  }

  close = ()=> {
    this.setState(()=>({display:false})) 
  }

  expenseDelete = () => {
    remove(ref(database, `Users/${this.props.userID}/Expenses/${this.props.expense.id}`))
      .then(()=>{this.props.dispatchRemoveExpense(this.props.expense)}) 
  }

  render () {
    let time = moment(this.props.expense.date).format("Do MMMM, YYYY");

    return (
      <div>
        <div className="record-item">
          <p className="record-item-part">{this.props.index + 1} </p>  
          <p className="record-item-part">{convertToSentenceCase(this.props.expense.description)} </p> 
          <p className="record-item-part">{numeral(this.props.expense.amount).format('$0,0[.]00')}</p>
          <button onClick={this.open} className="button-clean record-item-part">Expand</button>
          <button onClick={this.expenseDelete} className="button-clean record-item-part">Delete</button>
        </div>
        
        <Modal
          className="modal-style"
          isOpen={this.state.display}
        >
        <div>
          <p>Description:</p>
          <p>{convertToSentenceCase(this.props.expense.description)}</p>
        </div>
        <div>
          <p>Amount:</p>
          <p>{numeral(this.props.expense.amount).format('$0,0[.]00')}</p>
        </div>
        <div>
          <p>Date:</p>
          <p>{time}</p>
        </div>
        <div>
          <p>Note:</p>
          <p>{this.props.expense.note}</p>  
        </div>
          <Link to={`/editExpense/${this.props.expense.id}`}><button className="button-small">Edit</button></Link>
          <button onClick={this.close} className="button-small">Close</button>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userID:state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveExpense:(expense)=>dispatch(removeExpense(expense))
})

export default connect (mapStateToProps, mapDispatchToProps)(ExpensePage);