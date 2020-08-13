import React,{useContext, FormEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer'
import heart from '../../assets/images/icons/purple-heart.svg'
import logo from '../../assets/images/logo.svg'

import InputPassword from '../../components/InputPassword';
import AuthContext from '../../contexts/auth'
import './styles.css'

const Login: React.FC = () => {

    const {signIn} = useContext(AuthContext)
    const [email,setEmail] = useState('') 
    const [password, setPassword] = useState('')

    const handleSign =(e:FormEvent) =>{
        e.preventDefault()
     
        signIn(email,password)
    }
    
  return (
    <PageContainer>
        <div className="left">
            <img src={logo} alt="Logo"/>
            <h1>Sua plaforma de estudos online.</h1>
        </div>
        <div className="right">
            <form onSubmit={handleSign} >
                
                <h1>Fazer Login</h1>
                <div className="input-container">
                    <div>
                        <span>E-mail</span>
                        <input type="email" required onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <InputPassword label='Senha' required onChange={e=>setPassword(e.target.value)} />
                                     
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