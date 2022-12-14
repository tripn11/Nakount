import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../Firebase/firebase';

export default () => {
  return auth.currentUser ? <Outlet /> : <Navigate to="/login" /> 
}