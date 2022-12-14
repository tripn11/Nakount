import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default () => (
    <div>
        <h1>Nakount</h1>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="incomes">Incomes</NavLink>
        <NavLink to="expenses">Expenses</NavLink>
        <NavLink to="help">Help</NavLink>
        <Outlet />
    </div>
)