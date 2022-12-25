import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uid:"",
  message:"",
  loading: true
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
        },
        setLoading(state, action) {
          return {...state, loading:action.payload}
        }
    }
})

export const { setUserDetails, setStateMessage, setLoading } = authSlice.actions;
export default authSlice.reducer;