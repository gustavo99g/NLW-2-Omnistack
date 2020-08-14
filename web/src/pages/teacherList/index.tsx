import React,{useState, FormEvent,useEffect} from 'react';
import Header from '../../components/Header'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

interface teacherProp{
  class:teacherItem
}

interface teacherItem {
  id:number,
  name:string,
  avatar:string,
  subject:string,
  cost:number,
  bio:string,
  whatsapp:string

}


const TeacherList= () => {
  const [subject, setSubject] = useState<string>()
  const [week_day, setWeek_day] = useState<string>()
  const [time, setTime] = useState<string>()
  const [teachers, setTeachers] = useState([])

  const handleGetTeachers = async() =>{
    try{
      const res = await api.get('/classes',{
        params:{
          subject,
          week_day,
          time
        }
      })
      setTeachers(res.data)   

    }catch(err){
      console.log(err)
    }
  }

  const handleSearchTeacher =(e:FormEvent) =>{
    e.preventDefault()
    handleGetTeachers()
  }

  useEffect(()=>{
    handleGetTeachers()
  },[])

  console.log(teachers)


  const handleNewConnection =(user_id: number) =>{
    api.post('/connections', {user_id})
  }


  return (
    <div id='page-teacher-list' className="container">
      <Header title='Estes são os proffys disponiveis' label='Estudar'>
        <form className="search-teachers" onSubmit={handleSearchTeacher} >
        <Select 
          name='subject' 
          label='Materia'
          onChange={(e)=>setSubject(e.target.value)}
          options={[
            {value:'', label:'Todas as Materias'},
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
          <Select 
          name='week_day' 
          label='Dia da semana'
          onChange={(e)=>setWeek_day(e.target.value)}
          
          options={[
            {value:'', label:'Qualquer dia'},
            {value:'0', label:'Domingo'},
            {value:'1', label:'Segunda'},
            {value:'2', label:'Terça'},
            {value:'3', label:'Quarta'},
            {value:'4', label:'Quinta'},
            {value:'5', label:'Sexta'},
            {value:'6', label:'Sabádo'},
         
          
          ]}
          />
          <Input label='Horario' name='time' type='time' onChange={(e)=>setTime(e.target.value)} />
          <button type="submit" onClick={handleSearchTeacher} >Buscar</button>
        </form>
      </Header>
      <main>
        {teachers.map((teacher:teacherProp) =>(
          <article key={teacher.class.id} className="teacher-item">
          <header>
            <img src={teacher.class.avatar} alt="img"/>
            <div>
              <strong>{teacher.class.name}</strong>
              <span>{teacher.class.subject}</span>
            </div>
          </header>

          <p>
            {teacher.class.bio}
          </p>
          <footer>
            <p>Preço/hora
              <strong>R$ {teacher.class.cost}</strong>
            </p>
            <a target='_blank' onClick={()=>handleNewConnection(teacher.class.id)} href={`https://wa.me/${teacher.class.whatsapp}`}  >
              <img src={whatsappIcon} alt="Icon"/>
              Entrar em contato
            </a>
          </footer>

        </article>
        ))}
      </main>
    </div>
     
  )
}

export default TeacherList;