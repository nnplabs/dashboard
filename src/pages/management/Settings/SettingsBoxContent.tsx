import { Close, Help, OpenInFull, Telegram } from '@mui/icons-material'
import { List, ListItem } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import { useAccount } from '../../../hooks/useAccount'
import { AppData } from '../../../types/api/app'
import AccountSettings from './AccountSettings'
import AppSettings from './AppSettings'
import NewApp from './NewApp'
import SwitchApps from './SwitchApps'

function SettingsBoxContent() {
    const location = useLocation()
    const [open, setOpen] = React.useState(location.state?.tab ?? 0)
    const app = useAppContext()
    
    const handleAppSwitchClose = (newApp: AppData) => {
        setOpen(0)
        app?.setSelectedApp(newApp)
    }

    const handleCreateApp = (appName: string) => {
        console.log(appName)
        setOpen(0)
    }
    return (
        <div className='py-10 px-16 flex items-start w-[100vw]'>
            <List className='basis-1/6 border-r-2 border-gray-400'>
                <ListItem
                    selected={open === 0}
                    onClick={() => setOpen(0)}
                    button
                >
                    App Settings
                </ListItem>
                <ListItem
                    selected={open === 1}
                    onClick={() => setOpen(1)}
                    button
                >
                    New App
                </ListItem>
                <ListItem 
                    selected={open === 2}
                    onClick={() => setOpen(2)} 
                    button
                >
                    Switch App
                </ListItem>
                <ListItem 
                    selected={open === 3}
                    onClick={() => setOpen(3)}
                    button
                >
                    Account Details
                </ListItem>
            </List>
            {open === 3 ? <AccountSettings/> : <AppSettings/>}
            <SwitchApps open={open === 2} appList={app?.account?.App} selectedApp={app?.selectedApp} onClose={handleAppSwitchClose} />
            <NewApp open={open === 1} onClose={() => setOpen(0)} onCreate={handleCreateApp} />
        </div>
    )
}

export default SettingsBoxContent
