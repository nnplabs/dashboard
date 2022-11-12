import React, { ReactElement, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useWalletSelector } from '../context/WalletSelectorContext'

function RequireAuth({ children }: { children: ReactElement }) {
  const { accountId } = useWalletSelector() ?? {}
  console.log(useWalletSelector())
  const { pathname } = useLocation()
  const navigate = useNavigate()
  console.log('path', pathname)
  console.log('account', accountId)
  useEffect(() => {
    if (!accountId) {
      navigate('/login')
    } else if (pathname === "/login" && accountId) {
      navigate("/")
    }
  }, [accountId, navigate, pathname])

  return children
}

export default RequireAuth
