import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAllowed, redirectPath, children}) => {
    if(!isAllowed){
       return <Navigate to={redirectPath} replace/>
    }
  return (
    <div>
        {children ? children : <Outlet/>}
    </div>
  )
}

export default ProtectedRoute