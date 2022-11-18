import { Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppContext } from '../../../context/AppContext'

function AccountSettings() {
    const [name, setName] = React.useState('')
    const app = useAppContext()

    useEffect(() => {
        if (app) setName(app?.account.name || '')
    }, [app])

  return (
    <div className='flex flex-col p-8'>
        <div className='text-xl font-bold'>
            App Settings
        </div>
        <div className='flex flex-col gap-5 py-10 px-10 mt-8 border-blue-400 border bg-white w-[60vw]'>
            <div className='flex items-center'>
                <div className='font-bold w-24 text-right'>
                    App Id:
                </div>
                <div className='ml-8'>
                    {app?.account?.id}
                </div>
            </div>
            <div className='flex items-center'>
                <div className='font-bold w-24 text-right'>
                    App Name:
                </div>
                <div className='ml-8'>
                    <TextField variant='outlined' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='font-bold w-24 text-right'>
                    Created At:
                </div>
                <div className='ml-8'>
                    {app?.account?.createdAt.toString()}
                </div>
            </div>
            <hr />
            <div className='flex justify-end'>
                <Button disabled={name === app?.account?.name} variant='contained' color='primary'>
                    Save
                </Button>
            </div>
        </div>
    </div>
  )
}

export default AccountSettings
