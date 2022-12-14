import React from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';
import { ref, remove } from "firebase/database";
import { database } from "../Firebase/firebase";
import { removeIncome } from "../Reducers/recordsReducer";


export const convertToSentenceCase = (string) => {
  const newString = string.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()); //the regex takes whitespaces and signs and replaces it with the capital of the first word
  return newString
}

class IncomePage extends React.Component {
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

  incomeDelete = () => {
    remove(ref(database, `Users/${this.props.userID}/Incomes/${this.props.income.id}`))
      .then(()=>{this.props.dispatchRemoveIncome(this.props.income)})
  }

  render () {
    let time = moment(this.props.income.time).format("Do MMMM, YYYY");

    return (
      <div>
        <p>{this.props.index + 1}  {convertToSentenceCase(this.props.income.description)}  {numeral(this.props.income.amount).format('$0,0[.]00')}</p>
        <button onClick={this.open}>Expand</button>
        <Modal
          isOpen={this.state.display}
        >
          <p>Description:{convertToSentenceCase(this.props.income.description)}</p>
          <p>Amount:{numeral(this.props.income.amount).format('$0,0[.]00')}</p>
          <p>Date:{time}</p>
          <p>Note:{this.props.income.note}</p>
          <Link to={`/editIncome/${this.props.income.id}`}><button>Edit</button></Link>
          <button onClick={this.close}>Close</button>
        </Modal>
        <button onClick={this.incomeDelete}>Delete</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userID:state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveIncome:(income)=>dispatch(removeIncome(income))
})

export default connect (mapStateToProps, mapDispatchToProps)(IncomePage);