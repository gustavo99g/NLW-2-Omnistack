import React,{useContext} from 'react'
import {Route, Redirect,RouteProps} from 'react-router-dom'
import AuthContext from '../contexts/auth'

interface routesProps extends RouteProps{
    isPrivate?:boolean
    component:React.ComponentType
}

const RouteWrapper:React.FC<routesProps> =({isPrivate=false,component:Component,...rest})=>{


    const {signed} = useContext(AuthContext)

    return (
        <Route {...rest} render={() =>{
            return isPrivate === signed ?(
                <Component />
            ):(
                <Redirect to={{pathname: isPrivate ? '/' : '/home'}} />
            )
        }                     
        } />
    )
}

export default RouteWrapper