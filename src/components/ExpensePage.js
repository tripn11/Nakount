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
    let time = moment(this.props.expense.time).format("Do MMMM, YYYY");

    return (
      <div>
        <p>{this.props.index + 1}  {convertToSentenceCase(this.props.expense.description)}  {numeral(this.props.expense.amount).format('$0,0[.]00')}</p>
        <button onClick={this.open}>Expand</button>
        <Modal
          isOpen={this.state.display}
        >
          <p>Description:{convertToSentenceCase(this.props.expense.description)}</p>
          <p>Amount:{numeral(this.props.expense.amount).format('$0,0[.]00')}</p>
          <p>Date:{time}</p>
          <p>Note:{this.props.expense.note}</p>
          <Link to={`/editExpense/${this.props.expense.id}`}><button>Edit</button></Link>
          <button onClick={this.close}>Close</button>
        </Modal>
        <button onClick={this.expenseDelete}>Delete</button>
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