import React from 'react';
import PageContainer from '../../components/PageContainer'
import heart from '../../assets/images/icons/purple-heart.svg'
import logo from '../../assets/images/logo.svg'

import './styles.css'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <PageContainer>
        <div className="left">
            <img src={logo} alt="Logo"/>
            <h1>Sua plaforma de estudos online.</h1>
        </div>
        <div className="right">
            <form>
                
                <h1>Fazer Login</h1>
                <div className="input-container">
                    <input type="email" placeholder='E-mail'  />
                    <input type="password" placeholder='Senha'/>
                    
                </div>
                <div className="info">
                    <div className="form-block">
                        <input type="checkbox" name="reminder" id="reminder"/>
                            
                        
                        <label htmlFor="reminder">Lembrar-me</label>
                    </div>                    
                    <Link to="/forget">Esqueci minha senha</Link>

                </div>
                
                <button>Entrar</button>
                
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