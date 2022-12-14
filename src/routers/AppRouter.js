import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import DashboardPage from "../components/DashboardPage";
import NotFoundPage from "../components/NotFoundPage";
import IncomesPage from "../components/IncomesPage";
import ExpensesPage from "../components/ExpensesPage";
import HelpPage from "../components/HelpPage";
import Header from "../components/Header";
import AddIncomePage from "../components/AddIncomePage";
import EditIncomePage from "../components/EditIncomePage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


// export default () => ( 
//     <BrowserRouter> 
//         <Routes>
//             <Route path='/' element={<PrivateRoute />} exact>
//                 <Route path='/' element={<Header />} exact />
//                 <Route index  element={ <DashboardPage /> } />
//                 <Route path='incomes' element={ <PrivateRoute />}>
//                     <Route path='incomes' element={ <IncomesPage /> }/>
//                 </Route>
//                 <Route path='expenses' element={ <PrivateRoute /> }>
//                     <Route path='expenses' element={ <ExpensesPage /> } />
//                 </Route> 
//                 <Route path='help' element={ <PrivateRoute /> }>
//                     <Route path='help' element={ <HelpPage /> } />
//                 </Route>
//             </Route>
//             <Route path='login' element={<PublicRoute />}>
//                 <Route path='login' element={<LoginPage />} />
//             </Route>
//             <Route path='addIncome' element={<PrivateRoute />}>
//                 <Route path='addIncome' element={<AddIncomePage />} />
//             </Route>
//             <Route path='editIncome/:id' element={<PrivateRoute />}>
//                 <Route path='editIncome/:id' element={<EditIncomePage />} />
//             </Route>
//             <Route path='editExpense/:id' element={<PrivateRoute />}>
//                 <Route path='editExpense/:id' element={<EditExpensePage />} />
//             </Route>
//             <Route path='addExpense' element={<PrivateRoute />}>
//                 <Route path='addExpense' element={<AddExpensePage />} />
//             </Route>
//             <Route path='/*' element={ <NotFoundPage /> } />
//         </Routes>
//     </BrowserRouter>    
// )

// export default () => ( 
//     <BrowserRouter> 
//         <Routes>
//             <Route path='/' element={<PrivateRoute><DashboardPage /></PrivateRoute>} exact />
//             <Route path='incomes' element={ <PrivateRoute><IncomesPage /></PrivateRoute> }/>
//             <Route path='expenses' element={ <PrivateRoute><ExpensesPage /></PrivateRoute> } />
//             <Route path='help' element={ <PrivateRoute><HelpPage /></PrivateRoute> } />
//             <Route path='login' element={<PublicRoute><LoginPage /></PublicRoute>} />
//             <Route path='addIncome' element={<PrivateRoute><AddIncomePage /></PrivateRoute>} />
//             <Route path='editIncome/:id' element={<PrivateRoute><EditIncomePage /></PrivateRoute>} />
//             <Route path='editExpense/:id' element={<PrivateRoute><EditExpensePage /></PrivateRoute>} />
//             <Route path='addExpense' element={<PrivateRoute><AddExpensePage /></PrivateRoute>} />
//             <Route path='/*' element={ <NotFoundPage /> } />
//         </Routes>
//     </BrowserRouter>    
// )

export default () => ( 
    <BrowserRouter> 
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<Header />} exact>
                    <Route index element={<DashboardPage />} />
                    <Route path='incomes' element={ <IncomesPage /> }/>
                    <Route path='expenses' element={ <ExpensesPage /> } />
                    <Route path='help' element={ <HelpPage /> } /> 
                </Route>                   
                <Route path='addIncome' element={<AddIncomePage />} />
                <Route path='editIncome/:id' element={<EditIncomePage />} />
                <Route path='editExpense/:id' element={<EditExpensePage />} />
                <Route path='addExpense' element={<AddExpensePage />} />
            </Route>
            <Route element={<PublicRoute />}>
                <Route path='login' element={<LoginPage />} />
            </Route>
            <Route path='/*' element={ <NotFoundPage /> } />
        </Routes>
    </BrowserRouter>    
)