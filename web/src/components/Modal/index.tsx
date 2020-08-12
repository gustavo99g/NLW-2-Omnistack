import React from 'react';

import sucessIcon from '../../assets/images/icons/success-check-icon.svg'
import './styles.css'
import { Link } from 'react-router-dom';

interface ModalProps{
    title:string,
    desc:string,
    button:string

}

const Modal: React.FC<ModalProps> = ({title, desc,button}) => {
  return (
      <div className="modal">
          <img src={sucessIcon} alt="Sucess"/>
          <h1>{title}</h1>
          <p>{desc} </p>
          <button>
          <Link to='/' > {button} </Link>
          </button>
      </div>
  )
}

export default Modal;