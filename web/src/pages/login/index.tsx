import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer'
import heart from '../../assets/images/icons/purple-heart.svg'
import logo from '../../assets/images/logo.svg'
import password from '../../assets/images/icons/password.svg'
import showPasswordIcon from '../../assets/images/icons/showPassword.svg'
import './styles.css'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false)
    
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
                    <div>
                        <span>Senha</span>
                        <input type={showPassword ? 'text' :'password'} /> 
                        <button onClick={()=>setShowPassword(!showPassword)} >
                            {!showPassword ? <img src={password} alt="paswword"/>
                            :<img src={showPasswordIcon} alt="paswword"/>}
                        </button>
                    </div>                 
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