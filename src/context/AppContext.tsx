import { createContext, ReactElement, useContext, useMemo, useState } from "react"
import { LoginResponse } from "../types/response/appDetails"

export const AppContext = createContext<{
        appState: LoginResponse | null
        setAppState: (appState: LoginResponse | null) => void
    }| null>(null)

export const AppContextProvider = ({ children }: any): ReactElement => {
    const [appState, setAppState] = useState<LoginResponse | null>(null)
    const value = useMemo(() => ({ appState, setAppState }), [appState])

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context
}