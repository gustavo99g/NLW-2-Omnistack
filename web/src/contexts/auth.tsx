import React,{createContext, useState,useEffect} from 'react';
import api from '../services/api'


interface AuthContextProps{
    signed:boolean
    user:userProps | null
    signIn(email:string,password:string):Promise<void>
    signOut():void
}
interface userProps{
    name:string
    avatar:string
    email:string
}


const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] =useState<userProps | null>(null)
    
    useEffect(()=>{
        const userLocal = localStorage.getItem('user:proffy')
        const Token = localStorage.getItem('token:proffy')
        if(userLocal && Token){
            setUser(JSON.parse(userLocal))
            api.defaults.headers.Authorization = `Bearer ${Token}`
        }
    },[])

    

    const signIn = async(email:string,password:string)=>{
        try{
            const data = {
                email,
                password
            }
            const res = await api.post('/login',data)
            if(res.data.userInfo){
                setUser(res.data.userInfo)
                localStorage.setItem('user:proffy', JSON.stringify(res.data.userInfo))
                localStorage.setItem('token:proffy', res.data.token)
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`
                
            }else{
                alert('Email ou senha incorretos')
            }
        }catch(err){
            alert('Falha ao fazer o login')
        }        
    }
    const signOut =()=>{
        localStorage.removeItem('user:proffy')
        localStorage.removeItem('token:proffy')
        setUser(null)
    }

  return (
      <AuthContext.Provider value={{signed:!!user, user, signIn, signOut}} >
          {children}
      </AuthContext.Provider>
  )
}

export default AuthContext;