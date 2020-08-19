import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal'

import PageContainer from '../../components/PageContainer'

import logo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'
import './styles.css'
import InputPassword from '../../components/InputPassword';
import api from '../../services/api';


const Register: React.FC = () => {

    const [name,setName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault()
        const data={
            name,
            lastName,
            email,
            password
        }
        try{
            api.post('/users', data)
            setModal(true)
        }catch(err){
            alert('Falha ao cadastrar, tente novamente mais tarde')
        }
        
    }

 
    const [modal,setModal] = useState(false)

    if (modal){
        return <Modal title='Cadastro concluido' desc='Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.' button='Fazer Login' />
    }
  return (
      <PageContainer>    
        <div className="right">           
            <form onSubmit={handleSubmit} >
            <Link to='/' >
                <img src={backIcon} alt="Back"/>
            </Link>
                <h1>Cadastro</h1>
                <p>Preencha os dados abaixo para começar.</p>
                <div className="input-container">
                    <div>
                        <span>Nome</span>
                        <input required type="text"  onChange={e=>setName(e.target.value)}  />
                    </div>
                    <div>
                        <span>Sobrenome</span>
                        <input type="text" required onChange={e=>setLastName(e.target.value)}  />
                    </div>
                    <div>
                        <span>E-mail</span>
                        <input type="email" required onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <InputPassword label='Senha' required onChange={e=>setPassword(e.target.value)} />
                    
                </div>
                <button className='button' >Concluir cadastro</button>
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