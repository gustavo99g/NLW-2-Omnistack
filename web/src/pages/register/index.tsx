import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal'

import PageContainer from '../../components/PageContainer'

import logo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import password from '../../assets/images/icons/password.svg'
import showPasswordIcon from '../../assets/images/icons/showPassword.svg'
import './styles.css'


const Register: React.FC = () => {

 
    const [modal,setModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    if (modal){
        return <Modal title='Cadastro concluido' desc='Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.' button='Fazer Login' />
    }
  return (
      <PageContainer>    
        <div className="right">           
            <form onSubmit={(e)=>e.preventDefault()} >
            <Link to='/' >
                <img src={backIcon} alt="Back"/>
            </Link>
                <h1>Cadastro</h1>
                <p>Preencha os dados abaixo para começar.</p>
                <div className="input-container">
                    <div>
                        <span>Nome</span>
                        <input type="text"/>
                    </div>
                    <div>
                        <span>Sobrenome</span>
                        <input type="text"/>
                    </div>
                    <div>
                        <span>E-mail</span>
                        <input type="email"/>
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
                <button className='button' onClick={()=>setModal(true)} >Concluir cadastro</button>
            </form>
            
        </div>

        <div className="left">
            <img src={logo} alt="Logo"/>
            <h1>Sua plaforma de estudos online.</h1>
        </div>
      </PageContainer>
  )
}

export default Register;