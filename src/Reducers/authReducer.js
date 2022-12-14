import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uid:"",
  message:""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserDetails(state, action) {
            return {...state, uid:action.payload.uid, name:action.payload.name}
        },
        setStateMessage(state, action) {
          return  {...state, message:action.payload}
        }
    }
})

export const { setUserDetails, setStateMessage } = authSlice.actions;
export default authSlice.reducer;