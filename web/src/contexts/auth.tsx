import React,{createContext, useState,useEffect} from 'react';
import api from '../services/api'


interface AuthContextProps{
    signed:boolean
    user:object | null
    signIn(email:string,password:string):Promise<void>
    signOut():void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC = ({children}) => {
    const [user,setUser] =useState<object | null>(null)
    
    useEffect(()=>{
        const userLocal = localStorage.getItem('user:proffy')
        if(userLocal){
            setUser(JSON.parse(userLocal))
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
                
            }else{
                alert('Email ou senha incorretos')
            }
        }catch(err){
            alert('Falha ao fazer o login')
        }        
    }
    const signOut =()=>{
        localStorage.removeItem('user:proffy')
        setUser(null)
    }

  return (
      <AuthContext.Provider value={{signed:!!user,user,signIn,signOut}} >
          {children}
      </AuthContext.Provider>
  )
}

export default AuthContext;