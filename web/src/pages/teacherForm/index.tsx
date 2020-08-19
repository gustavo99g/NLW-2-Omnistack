import React,{useState,ChangeEvent,useEffect} from 'react';
import Header from '../../components/Header';
import {useHistory} from 'react-router-dom'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import './styles.css'
import api from '../../services/api';
import converTotime from '../../utils/convertToTIme';

interface inputProps{
  name:string
  lastName:string
  avatar:string
  cost:number
  email:string
  whatsapp:string
}

interface scheProps {
  week_day:number
  from:string
  to:string
}

const TeacherForm = () => {
  const [scheduleItems, setScheduleItems] = useState([
    {week_day:0, from:'', to:''},
  ])

  const [inputs,setInputs] = useState<inputProps>({} as inputProps)
  const [textArea, setTextArea] = useState('')
  const [subject, setSubject] = useState('')
  const history = useHistory()
  

  const handleAddSchedule = () =>{
    setScheduleItems([...scheduleItems, {
      week_day:0,
      from:'',
      to:''
    }])
  }
  useEffect(()=>{
    const getUserDate = async () =>{
      const res = await api.get('/users')
      const {subject,name,lastName,avatar,cost,email,whatsapp,bio} = res.data.user[0]
      setSubject(subject)
      setTextArea(bio)
      setInputs({
        name,
        lastName,
        avatar,
        cost,
        email,
        whatsapp
      })
      const newSchedule = res.data.schedule.map((sche:scheProps) =>{

        const to = converTotime(sche.to)
        const from = converTotime(sche.from)
        return {
          ...sche,
          to,
          from
        }
        
      })
    
      setScheduleItems(newSchedule) 
  
    }
    getUserDate()
  },[])

  const handleInputsChange =(e:ChangeEvent<HTMLInputElement>)=>{
    const {id, value} = e.target
    
    setInputs({
      ...inputs,
      [id]:value
    })

  }

  const handleSubmit = async () =>{

    const data ={
      ...inputs,
      bio:textArea,
      subject,
      schedule:scheduleItems
    }
    try{
      await api.put('/users', data)
      history.push('/home')
      
    }catch(err){
      alert('Falha ao salvar os dados, tente novamente mais tarde')
    }

    
  }


  const handleScheduleItemValue = (position:number, field:string, value:string) =>{
    const newArray = scheduleItems.map((schedule, index)=>{
      if (index === position){
        return {
          ...schedule, 
          [field]:value
        }
      }
      return schedule
    } )

    setScheduleItems(newArray)

  }

  const handleDeleteSchedule =(index:number) =>{
    const newArray = [...scheduleItems]
    newArray.splice(index,1)
    setScheduleItems(newArray)
  }


  return (
  
    <div id='page-teacher-form' className="container">
      <Header  label='Meu perfil'>
        <div className="info">
          <img src={inputs.avatar} alt="logo"/>
          <h1>{`${inputs.name} ${inputs.lastName}`}</h1>
          <p>{subject}</p>
        </div>
      </Header>

      <main>
        <fieldset>
          <legend>Seus Dados</legend>

          <div className="inputBlock">
            <Input name='name' label='Nome' onChange={handleInputsChange} value={inputs.name || ''} />
            <Input name='lastName' label='Sobrenome' onChange={handleInputsChange} value={inputs.lastName || ''} />
          </div>
          <div className="inputBlock">
            <Input name='email' label='E-mail' onChange={handleInputsChange} value={inputs.email || ''} />
            <Input name='whatsapp' label='WhatsApp' onChange={handleInputsChange} value={inputs.whatsapp || ''}  />
          </div>
          <Input name='avatar' label='Avatar'onChange={handleInputsChange} value={inputs.avatar || ''} />
          
          <TextArea name='bio' label='Bio' onChange={(e)=>setTextArea(e.target.value)} value={textArea}/>
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select 
          onChange={(e)=> setSubject(e.target.value)}
          name='subject' 
          label='Materia'
          value={subject}
          options={[
            {value:'Artes', label:'Artes'},
            {value:'Biologia', label:'Biologia'},
            {value:'Matematica', label:'Matematica'},
            {value:'Ciencias', label:'Ciencias'},
            {value:'Fisica', label:'Fisica'},
            {value:'Quimica', label:'Quimica'},
            {value:'Portugues', label:'Portugues'},
            {value:'Educação fisica', label:'Educação fisica'},
            {value:'Geografia', label:'Geografia'},
            {value:'Historia', label:'Historia'},
            
          ]}
          />
          <Input name='cost' label='Custo da sua aula por hora (R$)' onChange={handleInputsChange} value={inputs.cost || ''}   />
          
        </fieldset>

        <fieldset>
          <legend>
            Horarios disponiveis
            <button onClick={handleAddSchedule} >
             + Novo horario
            </button>
            </legend>

          
          {scheduleItems.map((schedule,index)=>(
            <div key={schedule.week_day}>     
            <div  className="schedule-item">
            <Select 
            onChange={(e)=>handleScheduleItemValue(index, 'week_day',e.target.value )}
            name='week_day' 
            label='Dia da semana'
            value={schedule.week_day}
            options={[
              
              {value:'1', label:'Segunda'},
              {value:'2', label:'Terça'},
              {value:'3', label:'Quarta'},
              {value:'4', label:'Quinta'},
              {value:'5', label:'Sexta'},
           
          
            
            ]}
            />
            <Input name='from' label='Das' type='time' value={schedule.from} onChange={(e)=>handleScheduleItemValue(index, 'from',e.target.value )} />
          <Input name='to' label='Até' type='time' value={schedule.to}  onChange={(e)=>handleScheduleItemValue(index, 'to',e.target.value )}   />
          </div>
          <div className='bottom'>
            <hr/>
            <h1 onClick={()=>handleDeleteSchedule(index)} >Excluir horario</h1>
            <hr/>
          </div>
          </div>
          
      
          ))}
          
         
          
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="icon"/>
              Importante <br />
              Preencha todos os dados
          </p>

          <button type='button' onClick={handleSubmit} >
            Salvar cadastro
          </button>
        </footer>

      </main>
    </div>
  )
}

export default TeacherForm;