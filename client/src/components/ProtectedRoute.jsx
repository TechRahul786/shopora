import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet,  useLocation } from 'react-router-dom'

const ProtectedRoute = ({allowRoles}) => {
    const {user,loading} = useSelector(state=>state.auth)
    const location = useLocation()
    if(loading){
        return (
             <div className="p-8 text-center">Checking authentication...</div>
        )
    }

    if(!user){
        const loginPath = allowRoles?.includes('admin') ? '/admin/login' : '/login'
        return (
            <Navigate to={loginPath} state={{from:location}} replace/>
        )
    }

     // User is logged in but doesn't have the required role
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

 
}

export default ProtectedRoute