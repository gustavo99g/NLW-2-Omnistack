import React, { useState } from 'react';

import PageContainer from '../../components/PageContainer'

import logo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import InputPassword from '../../components/InputPassword';

const ChangePass: React.FC = () => {

    const [modal,setModal] = useState(false)

    if (modal){
        return <Modal title='Senha atualizado com sucesso' 
        desc='Agora é só entrar com sua nova senha'
         button='Voltar ao login' />
    }

  return (
      <PageContainer>
          
        <div className="right">
            
            <form onSubmit={e => e.preventDefault()} >
            <Link to='/' >
                <img src={backIcon} alt="Back"/>
            </Link>
                <h1>Quase pronto</h1>
                <p>Voce só precisa digitar sua nova senha abaixo e confirma-la</p>
               <div className="input-container">
               <InputPassword label='Nova Senha' />
                <InputPassword label='Confirme a nova Senha' />
                    
               </div>
                
                
                <button className='button' onClick={()=>setModal(true)} >Enviar</button>
            </form>
            
        </div>

        <div className="left">
            <img src={logo} alt="Logo"/>
            <h1>Sua plaforma de estudos online.</h1>
        </div>
      </PageContainer>
  )
}

export default ChangePass;