import React, { useState, FormEvent } from 'react';

import PageContainer from '../../components/PageContainer'

import logo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import { Link,useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import InputPassword from '../../components/InputPassword';
import api from '../../services/api';

const ChangePass: React.FC = () => {

    const [modal,setModal] = useState(false)
    const [password,setPassoword] = useState('')
    const [confirmPassword,setConfirmPassoword] = useState('')

    const {resetToken} = useParams()
    console.log(resetToken)

    if (modal){
        return <Modal title='Senha atualizado com sucesso' 
        desc='Agora é só entrar com sua nova senha'
         button='Voltar ao login' />
    }


    const handleSubmit = async(e:FormEvent) =>{
        e.preventDefault()
        if (password !== confirmPassword){
            alert('Por favor verifique se as senhas estao corretas')
        }else{
            try{
                await api.post(`/reset/${resetToken}`, {password})
                setModal(true)
            }catch(err){
                alert(err.message)
            }
        }
    }

  return (
      <PageContainer>
          
        <div className="right">
            
            <form onSubmit={handleSubmit} >
            <Link to='/' >
                <img src={backIcon} alt="Back"/>
            </Link>
                <h1>Quase pronto</h1>
                <p>Voce só precisa digitar sua nova senha abaixo e confirma-la</p>
               <div className="input-container">
               <InputPassword label='Nova Senha' onChange={e=>setPassoword(e.target.value)} />
                <InputPassword label='Confirme a nova Senha' onChange={e=>setConfirmPassoword(e.target.value)} />
                    
               </div>
                
                
                <button className='button'  >Enviar</button>
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