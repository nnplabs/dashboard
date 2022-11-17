import React, { ReactElement, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useWalletSelector } from '../context/WalletSelectorContext'

function RequireAuth({ children }: { children: ReactElement }) {
  //const { accountId } = useWalletSelector() ?? {}
  const app = useAppContext();
  const { pathname } = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!app) {
      navigate('/login')
    } else if (pathname === "/login" && app) {
      navigate("/management/events")
    } 
  }, [app, navigate, pathname])

  return children
}

export default RequireAuth
