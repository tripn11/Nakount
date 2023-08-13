import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';
import { ref, remove } from "firebase/database";
import { database } from "../Firebase/firebase";
import { removeIncome } from "../Reducers/recordsReducer";
import { setLoading } from "../Reducers/authReducer";
import LoadingPage from "./LoadingPage";


export const convertToSentenceCase = (string) => {
  const newString = string.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()); //the regex takes whitespaces and signs and replaces it with the capital of the first word
  return newString
}

const IncomePage = (props) => {
  const [display,setDisplay] = useState(false)
  const loadingState = useSelector(state=>state.auth.loading)
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

  const incomeDelete = () => {
    dispatch(setLoading(true))
    remove(ref(database, `Users/${userID}/Incomes/${props.income.id}`))
      .then( ()=>{
        dispatch(removeIncome(props.income))
        dispatch(setLoading(false))
      }
    )
  }

  return (loadingState ? <LoadingPage /> :
    <div className='detail'>
      <div onClick={openModal}>
        <p>{props.index + 1}</p> 
        <p>{convertToSentenceCase(props.income.description)}</p> 
        <p>{numeral(props.income.amount).format('$0,0[.]00')}</p>
      </div>
      <Modal
        className="modal-style"
        isOpen={display}
        >
        <div>
          <p>Description:</p> 
          <p>{convertToSentenceCase(props.income.description)}</p>
        </div>
        <div>
          <p>Amount:</p> 
          <p>{numeral(props.income.amount).format('$0,0[.]00')}</p>
        </div>
        <div>
          <p>Date:</p> 
          <p>{moment(props.income.date).format("Do MMMM, YYYY")}</p>
        </div>
        <div>
          <p>Note:</p> 
          <p>{props.income.note}</p>
        </div>
        <div>
          <Link to={`/editIncome/${props.income.id}`} className='edit-detail'><button >Edit</button></Link>
          <button onClick={incomeDelete}>Delete</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  )
}

export default IncomePage;
