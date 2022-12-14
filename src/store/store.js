import { configureStore } from '@reduxjs/toolkit' //this is the new way. it already has the combine reducers and the thunk.
import recordsReducer from '../Reducers/recordsReducer'
import filtersReducer from '../Reducers/filtersReducer'
import authReducer from '../Reducers/authReducer'


export default configureStore({
    reducer: {
      records: recordsReducer,
      filters: filtersReducer,
      auth: authReducer
    }
})


  //when you install reduxjs/toolkit no need to install redux and redux thunk, it has them already