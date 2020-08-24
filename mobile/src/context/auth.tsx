import React, { createContext,useEffect,useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
import { Alert } from 'react-native'


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

export const Auth:React.FC = ({children}) => {

    const [user,setUser] =useState<userProps | null>(null)
    
    useEffect(()=>{
        const loadUser =async() =>{
            const userLocal = await AsyncStorage.getItem('user:proffy')
            const Token = await AsyncStorage.getItem('token:proffy')
            if(userLocal && Token){
                setUser(JSON.parse(userLocal))
                api.defaults.headers.Authorization = `Bearer ${Token}`
            }
        }
        loadUser()
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
                await AsyncStorage.setItem('user:proffy', JSON.stringify(res.data.userInfo))
                await AsyncStorage.setItem('token:proffy', res.data.token)
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`
                
            }else{
                Alert.alert('Email ou senha incorretos')
            }
        }catch(err){
            Alert.alert('Falha ao fazer o login')
        }        
    }
    const signOut = async()=>{
        await AsyncStorage.removeItem('user:proffy')
        await AsyncStorage.removeItem('token:proffy')
        setUser(null)
    }

  return (
      <AuthContext.Provider value={{signed:!!user, user, signIn, signOut}} >
          {children}
      </AuthContext.Provider>
  )
}

export default AuthContext;
