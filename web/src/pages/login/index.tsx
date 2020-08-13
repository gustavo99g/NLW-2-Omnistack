import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer'
import heart from '../../assets/images/icons/purple-heart.svg'
import logo from '../../assets/images/logo.svg'

import './styles.css'
import InputPassword from '../../components/InputPassword';


const Login: React.FC = () => {

  
    
  return (
    <PageContainer>
        <div className="left">
            <img src={logo} alt="Logo"/>
            <h1>Sua plaforma de estudos online.</h1>
        </div>
        <div className="right">
            <form onSubmit={(e)=>{e.preventDefault()}} >
                
                <h1>Fazer Login</h1>
                <div className="input-container">
                    <div>
                        <span>E-mail</span>
                        <input type="email"  />
                    </div>
                    <InputPassword label='Senha' />
                                     
                </div>
                <div className="info">
                    <div className="form-block">
                    <label className="label">Lembrar-me
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    </div>                    
                    <Link to="/forget">Esqueci minha senha</Link>

                </div>
                
                <button className='button'>Entrar</button>
                
                <footer>
                    <span>
                        Não tem conta?
                        <Link to="/register">Cadastre-se</Link>
                    </span>
                    <span>É de graça <img src={heart} alt="heart"/> </span>
                </footer>
            </form>
           
        </div>
    </PageContainer>
  )
}

export default Login;