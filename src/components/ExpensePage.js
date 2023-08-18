import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';
import { ref, remove } from "firebase/database";
import { database } from "../Firebase/firebase";
import { removeExpense } from "../Reducers/recordsReducer";
import { setLoading } from "../Reducers/authReducer";


export const convertToSentenceCase = (string) => {
  const newString = string.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()); //the regex takes whitespaces and signs and replaces it with the capital of the first word
  return newString
}

const ExpensePage = (props) => {
  const [display,setDisplay] = useState(false)
  const userID = useSelector(state=>state.auth.uid)
  const dispatch = useDispatch();

  useEffect (()=>{
    Modal.setAppElement('body'); //to help on screen readers to know the modal is the active screen. it is required as the warning appears without this line
  },[])

  const openModal = () => {
    setDisplay(true);
  }

  const closeModal = ()=> {
    setDisplay(false);
  }

  const expenseDelete = () => {
    dispatch(setLoading(true))
    remove(ref(database, `Users/${userID}/Expenses/${props.expense.id}`))
      .then( ()=>{
        dispatch(removeExpense(props.expense))
        dispatch(setLoading(false))
      }
    )
  }

  return (
    <div className='detail'>
      <div onClick={openModal}>
        <p>{props.index + 1}</p> 
        <p>{convertToSentenceCase(props.expense.description)}</p> 
        <p>{numeral(props.expense.amount).format('$0,0[.]00')}</p>
      </div>
      <Modal
        className="modal-style"
        overlayClassName='overlay-style'
        isOpen={display}
        >
        <div>
          <p>Description:</p> 
          <p>{convertToSentenceCase(props.expense.description)}</p>
        </div>
        <div>
          <p>Amount:</p> 
          <p>{numeral(props.expense.amount).format('$0,0[.]00')}</p>
        </div>
        <div>
          <p>Date:</p> 
          <p>{moment(props.expense.date).format("Do MMMM, YYYY")}</p>
        </div>
        <div>
          <p>Note:</p> 
          <p>{props.expense.note}</p>
        </div>
        <div>
          <Link to={`/editExpense/${props.expense.id}`} className='edit-detail'><button >Edit</button></Link>
          <button onClick={expenseDelete}>Delete</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  )
}

export default ExpensePage;