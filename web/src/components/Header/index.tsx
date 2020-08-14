import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps{
    title:string,
    description?:string
    label:string
}

const Header:React.FC<PageHeaderProps> = ({description,title,label,children}) => {
  return (
    <header className="page-header">
        <div className="background">
            <div className="top-bar-container">
                <Link to='/home'>
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <h1>{label}</h1>
                <img src={logoImg} alt="Proffy"/>
            </div>
        </div>
        <div className="header-content">
            <strong>{title}</strong>
            {description && <p>{description} </p>}
            {children}
        </div>
  </header>
  )
}

export default Header;