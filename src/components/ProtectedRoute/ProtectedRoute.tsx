import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../../services/store';
import { Role } from '../../types';

export const ProtectedRoute = ({ accessRoles }: { accessRoles: Role[] }) => {
  // return (
  // <>
  // <Route path='/' element={<ProtectedRoute accessRoles={[accessRoles]} />}>
  //     <Route path='/' element={<Main />} />
  // </Route>
  // <Outlet />
  // </>
  // )
};
