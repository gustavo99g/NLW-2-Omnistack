import React from 'react'
import {Route, Redirect,RouteProps, RouteComponentProps} from 'react-router-dom'

interface routesProps extends RouteProps{
    isPrivate?:boolean
    component:React.ComponentType<RouteComponentProps>
}

const RouteWrapper:React.FC<routesProps> =({isPrivate=false,component:Component,...rest})=>{
    
    const signed = true

    if (!signed && isPrivate){
        return <Redirect  to={"/"} />
    }

    if (signed && !isPrivate){
        return <Redirect to="/home" />
    }


    return (
        <Route {...rest} render={props =>(
            
                <Component {...props} />             
            
        )} />
    )
}

export default RouteWrapper