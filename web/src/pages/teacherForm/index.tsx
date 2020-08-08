import React,{useState,ChangeEvent} from 'react';
import Header from '../../components/Header';
import {useHistory} from 'react-router-dom'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import './styles.css'
import api from '../../services/api';



const TeacherForm = () => {
  const [scheduleItems, setScheduleItems] = useState([
    {week_day:0, from:'', to:''},
  ])
  const [inputs,setInputs] = useState({})
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

  const handleInputsChange =(e:ChangeEvent<HTMLInputElement>)=>{
    const {id, value} = e.target
    
    setInputs({
      ...inputs,
      [id]:value
    })

  }

  const handleSubmit =() =>{

    const data ={
      ...inputs,
      bio:textArea,
      subject,
      schedule:scheduleItems
    }
    api.post('/classes', data).then(()=>{
      alert('Cadastro realizado com sucesso')
      history.push('/')
    }).catch(()=>{
      alert('Falha no cadastro')
    })

    
    
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


  return (
    <div id='page-teacher-form' className="container">
      <Header title='Que incrivel que voce quer dar aulas' description='O primeiro passo é preencher esse formulario de inscrição' />

      <main>
        <fieldset>
          <legend>Seus Dados</legend>

          <Input name='name' label='Nome completo' onChange={handleInputsChange} />
          <Input name='avatar' label='Avatar'onChange={handleInputsChange}  />
          <Input name='whatsapp' label='WhatsApp' onChange={handleInputsChange}  />
          <TextArea name='bio' label='Bio' onChange={(e)=>setTextArea(e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select 
          onChange={(e)=> setSubject(e.target.value)}
          name='subject' 
          label='Materia'
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
          <Input name='cost' label='Custo da sua aula por hora (R$)' onChange={handleInputsChange}  />
          
        </fieldset>

        <fieldset>
          <legend>
            Horarios disponiveis
            <button onClick={handleAddSchedule} >
             + Novo horario
            </button>
            </legend>

          
          {scheduleItems.map((schedule,index)=>(
            <div key={schedule.week_day} className="schedule-item">
            <Select 
            onChange={(e)=>handleScheduleItemValue(index, 'week_day',e.target.value )}
            name='week_day' 
            label='Dia da semana'
            options={[
              {value:'0', label:'Domingo'},
              {value:'1', label:'Segunda'},
              {value:'2', label:'Terça'},
              {value:'3', label:'Quarta'},
              {value:'4', label:'Quinta'},
              {value:'5', label:'Sexta'},
              {value:'6', label:'Sabádo'},
           
            
            ]}
            />
            <Input name='from' label='Das' type='time' onChange={(e)=>handleScheduleItemValue(index, 'from',e.target.value )} />
          <Input name='to' label='Até' type='time' onChange={(e)=>handleScheduleItemValue(index, 'to',e.target.value )} />
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