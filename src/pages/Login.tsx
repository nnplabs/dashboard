import { Button } from '@mui/material'
import React from 'react'
import { useWalletSelector } from '../context/WalletSelectorContext'

function Login() {
    const { modal } = useWalletSelector() ?? {}
    
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <Button onClick={() => modal?.show()}>
                Login with Near
            </Button>
        </div>
    )
}

export default Login
