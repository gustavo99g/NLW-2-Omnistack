import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Route from './routes'
import Landing from '../pages/landing'
import TeacherForm from '../pages/teacherForm'
import TeacherList from '../pages/teacherList'
import Login from '../pages/login'
import Register from '../pages/register'
import Forget from '../pages/forgetPassword'
import ChangePass from '../pages/changePass'


const Routes = () =>{
    return (
        <BrowserRouter>
         
            <Route path='/' exact component={Login} />
            <Route path='/study' component={TeacherList} isPrivate/>
            <Route path='/give-classes' component={TeacherForm} isPrivate />
            <Route path='/register' component={Register} />
            <Route path='/forget' component={Forget} />
            <Route path='/reset/:resetToken' component={ChangePass} />
            <Route path='/home' component={Landing} isPrivate />
        </BrowserRouter>    
    )
}


export default Routes