import React,{useEffect,useState,useContext} from 'react';
import {Link} from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import AuthContext from '../../contexts/auth'

import signOutIcon from '../../assets/images/icons/Sair.svg'
import './styles.css'
import api from '../../services/api';



const Landing = () => {
    const [connections, setConnections] = useState(0)

    const {signOut,user} = useContext(AuthContext)
    

    useEffect(()=>{
        api.get('/connections').then(res =>{
            setConnections(res.data.total)
        })
    },[])

  return (
      <div>
      <div className="page-landing">
          
          <div id='container' className="page-landing-content"  >
                <header>
                    <div className="userInfo">
                        <img src={user?.avatar} alt="avatar"/>
                        <span>{user?.name} </span>
                    </div>
                    <button onClick={signOut} >
                        <img src={signOutIcon} alt="signout"/>
                    </button>
                </header>
          
              <div className="logo-container">
                
                  <img src={logoImg} alt="Proffy"/>
                  <h2>Sua plataforma de estudos online</h2>

              </div>
              <img src={landingImg} alt="Logo" className='hero-image' />
            </div>

            </div>
            <footer className='footer'>
                <p className='welcome' >Seja bem-vindo. <span>O que deseja fazer?</span></p>
                <span className='total-connections' >
                    Total de {connections} conexões ja realizadas <img src={purpleHeartIcon} alt="Logo"/>
                </span>
                <div className="buttons-container">

                    

                    <Link to="/study" className='study' >
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className='giveClasses' >
                        <img src={giveClassesIcon} alt="Dar aula"/>
                        Dar aulas
                    </Link>
            </div>
            </footer>
            
         </div>
      
  )
}

export default Landing;