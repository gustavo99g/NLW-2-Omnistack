import React,{InputHTMLAttributes,useState} from 'react';



import password from '../../assets/images/icons/password.svg'
import showPasswordIcon from '../../assets/images/icons/showPassword.svg'
import './styles.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string,
 
}

const InputPassword: React.FC<inputProps> = ({label, ...rest}) => {

    const [showPassword, setShowPassword] = useState(false)
  return (
        <div>
            <span>{label}</span>
            <input type={showPassword ? 'text' :'password'} {...rest} /> 
            <button onClick={()=>setShowPassword(!showPassword)} >
                {!showPassword ? <img src={password} alt="paswword"/>
                :<img src={showPasswordIcon} alt="paswword"/>}
            </button>
        </div>
  )
}

export default InputPassword;