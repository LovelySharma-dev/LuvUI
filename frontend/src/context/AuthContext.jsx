import { createContext, useContext, useEffect, useState } from "react"
import {api} from "../services/api"

const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null)

    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    const checkAuth = async () => {
        try {
            const res = await api.get("/auth/check")
            setAuthUser(res.data.user)
        } catch (error) {
            setAuthUser(null)
        }
        finally{
            setIsCheckingAuth(false)
        }
    }
    
    useEffect(() => {
      checkAuth()
    
      
    }, [])
    
    const value = {
        authUser,
        setAuthUser,
        isCheckingAuth,
        checkAuth
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
