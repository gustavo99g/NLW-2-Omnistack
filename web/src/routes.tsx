import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'


import Landing from './pages/landing'
import TeacherForm from './pages/teacherForm'
import TeacherList from './pages/teacherList'
import Login from './pages/login'
import Register from './pages/register'
import Forget from './pages/forgetPassword'


const Routes = () =>{
    return (
        <BrowserRouter>
         
            <Route path='/' exact component={Login} />
            <Route path='/study' component={TeacherList} />
            <Route path='/give-classes' component={TeacherForm} />
            <Route path='/register' component={Register} />
            <Route path='/forget' component={Forget} />
        </BrowserRouter>    
    )
}


export default Routes