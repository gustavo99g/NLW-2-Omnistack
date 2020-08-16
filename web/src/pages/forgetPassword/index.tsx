import React, { useState, FormEvent } from 'react';

import PageContainer from '../../components/PageContainer'

import logo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import Input from '../../components/Input'
/* import './styles.css' */
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import api from '../../services/api';

const Forget: React.FC = () => {

    const [modal,setModal] = useState(false)
    const [email,setEmail] = useState('')

    if (modal){
        return <Modal title='Redefinição enviada!' 
        desc='Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.'
         button='Voltar ao login' />
    }

    const handleSubmit =async (e:FormEvent) =>{
        e.preventDefault()

        try{
            await api.post('/forgetPassword',{email})
            setModal(true)
            console.log('test')
        }catch(err){
            alert('Usuario nao encontrado, por favor verifique o email')
        }
    }

  return (
      <PageContainer>
          
        <div className="right">
            
            <form onSubmit={handleSubmit} >
            <Link to='/' >
                <img src={backIcon} alt="Back"/>
            </Link>
                <h1>Eita, esqueceu sua senha?</h1>
                <p>Não esquenta, vamos dar um jeito nisso.</p>
               
                <Input label='Email' name='Email' onChange={e=> setEmail(e.target.value)} />
                    
                
                <button className='button'>Enviar</button>
            </form>
            
        </div>

        <div className="left">
            <img src={logo} alt="Logo"/>
            <h1>Sua plaforma de estudos online.</h1>
        </div>
      </PageContainer>
  )
}

export default Forget;