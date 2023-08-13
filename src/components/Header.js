import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default () => (
    <div id="dashboard-page">
        <div id="header">
            <Outlet />
            <div id="header-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "header-nav-item_active nav":"header-nav-item nav" }>
                    <ion-icon name="home"></ion-icon><span>Home</span>
                </NavLink>
                <NavLink to="incomes" className={({ isActive }) => isActive ? 
                    "header-nav-item_active nav":"header-nav-item nav" }>
                        <ion-icon name="add-outline"></ion-icon><span>Incomes</span>
                </NavLink>
                <NavLink to="expenses" className={({ isActive }) => isActive ? 
                    "header-nav-item_active nav":"header-nav-item nav" }>
                        <ion-icon name="remove-outline"></ion-icon><span>Expenses</span>
                </NavLink>
                <NavLink to="help" className={({ isActive }) => isActive ? 
                    "header-nav-item_active nav":"header-nav-item nav" }>
                        <ion-icon name="help-outline"></ion-icon><span>Help</span> 
                </NavLink>
            </div>
        </div>
    </div>
)