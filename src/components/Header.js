import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import fullLogo from '../Images/fullLogo.png';

export default () => (
    <div id="dashboard-page">
        <div id="header">
            <img className="header-logo" src={fullLogo} alt="logo"/>
            <div id="header-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "header-nav-item_active":"header-nav-item" }>Dashboard</NavLink>
                <NavLink to="incomes" className={({ isActive }) => isActive ? "header-nav-item_active":"header-nav-item" }>Incomes</NavLink>
                <NavLink to="expenses" className={({ isActive }) => isActive ? "header-nav-item_active":"header-nav-item" }>Expenses</NavLink>
                <NavLink to="help" className={({ isActive }) => isActive ? "header-nav-item_active":"header-nav-item" }>Help</NavLink>
            </div>
        </div>
        <Outlet />
    </div>
)