import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sortBy:"oldToNew",
    searchedWord:""
}

const filtersSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        newToOld (state) {
            return {...state, sortBy:"newToOld"}
        },
        oldToNew (state) {
            return {...state, sortBy:"oldToNew"}
        },
        ascending (state) {
            return {...state, sortBy:"ascending"}
        },
        descending (state) {
            return {...state, sortBy:"descending"}
        },
        setWord (state, action) {
            return {...state, searchedWord:action.payload}
        }
    }
})

export const { newToOld, oldToNew, ascending, descending, setWord } = filtersSlice.actions
export default filtersSlice.reducer