import { createSlice } from '@reduxjs/toolkit' //used in creating the reducer which automatically generates the action generators.


const initialState = {
  incomes:[],
  expenses:[]
}; //it must be called initialState

const recordsSlice = createSlice({ //createSlice takes in name which it uses in the action type,the state, and the reducer conditions which used to be switch-case statements
  name: 'records',
  initialState,
  reducers: {
    addIncome (state, action) {
      state.incomes.push(action.payload)
    },
    removeIncome (state, action) {
      const remainingIncomes = state.incomes.filter( (income) => income.id !== action.payload.id)
      state.incomes = remainingIncomes;
    },
    editIncome (state, action) {
      state.incomes.map((income,index)=>{
        if(income.id === action.payload.id){
          state.incomes.splice(index, 1, action.payload)
        }
      })
    },
    addExpense (state, action) {
      state.expenses.push(action.payload)
    },
    removeExpense (state, action) {
      const remainingExpenses = state.expenses.filter( (expense) => expense.id !== action.payload.id)
      state.expenses = remainingExpenses;
    },
    editExpense (state, action) {
      state.expenses.map((expense,index)=>{
        if(expense.id === action.payload.id){
          state.expenses.splice(index, 1, action.payload)
        }
      })
    },
    setIncomes (state, action) {
      state.incomes = action.payload
    },
    setExpenses (state, action) {
      state.expenses = action.payload
    }
  }
})

export const { addIncome, removeIncome, editIncome, addExpense, removeExpense, editExpense, setIncomes, setExpenses  } = recordsSlice.actions //the automatically generated action generators are saved in recordsSlice.actions

export default recordsSlice.reducer //the generated reducer is saved in recordsSlice.reducer