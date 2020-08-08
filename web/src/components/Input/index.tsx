import React,{InputHTMLAttributes} from 'react';

import './styles.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string,
    name: string
}

const Input: React.FC<inputProps> = ({label,name, ...rest}) => {
  return (
    <div className="input-block">
        <label htmlFor={name}>{label}</label>
        <input {...rest} id={name}/>
    </div>
  )
}

export default Input;