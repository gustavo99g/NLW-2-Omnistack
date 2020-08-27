import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,ScrollView, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import {Feather} from '@expo/vector-icons'
import Header from '../../components/Header';
import TeacherCard,{Teacher} from '../../components/TeacherCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';




const TeacherList: React.FC = () => {

  const timer = [
    {value:'08:00', label:'8 horas'},
    {value:'09:00', label:'9 horas'},
    {value:'10:00', label:'10 horas'},
    {value:'11:00', label:'11 horas'},
    {value:'12:00', label:'12 horas'},
    {value:'13:00', label:'13 horas'},
    {value:'14:00', label:'14 horas'},
    {value:'15:00', label:'15 horas'},
    {value:'16:00', label:'16 horas'},
    {value:'17:00', label:'17 horas'},
    {value:'18:00', label:'18 horas'},
]

  const [filterVisible, setFilterVisible] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [refresh, setRefresh] = useState(false)

  const [subject,setSubject] = useState('')
  const [week_day,setWeek_day] = useState('')
  const [time,setTime] = useState('')
  const [favorites, setFavorites] = useState([])


  useEffect(()=>{
    getProffys()
    
  },[refresh])


  const getProffys = async() =>{
    const res = await api.get('/classes',{
      params:{
        subject,
        week_day,
        time
    }})
    setTeachers(res.data)
  
    setFilterVisible(false)

    const res2 = await api.get('/favorites')
    setFavorites(res2.data)
 
      
  }

  


  return (
    
      <View style={styles.container} >
        <Header 
        title='Proffys disponiveis' 
        headerRight={(
          <Text>{teachers.length} Proffys</Text>
        )} >
          <TouchableOpacity onPress={()=>setFilterVisible(!filterVisible)} >
            <Feather name='filter' size={24} color='#04D361' />
          </TouchableOpacity>
          {filterVisible &&<View style={styles.searchForm} >
          <RNPickerSelect style={pickerSelectStyles} 
                placeholder={{label:'Selecione'}} 
                useNativeAndroidPickerStyle={false} 
                onValueChange={(value) => setSubject(value)} 
                value={subject}
                items={[
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
                ]}/>
            <View style={styles.inputContainer} >
              <View style={styles.inputBlock} >
                <Text style={styles.label} >Dia da semana</Text>
                <RNPickerSelect style={pickerSelectStyles} 
                placeholder={{label:'Selecione'}} 
                useNativeAndroidPickerStyle={false} 
                onValueChange={(value) => setWeek_day(value)} 
                value={week_day}
                items={[
                  {value:1,label:'Segunda' },
                  {value:2,label:'Terça'},
                  {value:3,label:'Quarta' },
                  {value:4,label:'Quinta' },
                  {value:5,label:'Sexta'},
              ]}/>
              </View>
              <View style={styles.inputBlock} >
                <Text style={styles.label} >Horario</Text>
                <RNPickerSelect style={pickerSelectStyles} 
                placeholder={{label:'Selecione'}} 
                useNativeAndroidPickerStyle={false} 
                onValueChange={(value) => setTime(value)} 
                value={time}
                items={timer}/>
              </View>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={getProffys} >
              <Text style={styles.submitText} >Buscar</Text>
            </TouchableOpacity>
          </View>}
        </Header>
      <ScrollView style={styles.teacherList} contentContainerStyle={{paddingBottom:16}} >
        {teachers.map((teacher:Teacher)=>(
          <TeacherCard 
          key={teacher.class.id} 
          refreshFunc={()=>setRefresh(!refresh)} 
          schedule={teacher.schedule} 
          class={teacher.class}
          favorite={favorites.some((favorite:Teacher) => favorite.class.id == teacher.class.id)}
          />
        ))}
        
      
      
    </ScrollView>
    </View>
  )
}
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height:54,
    backgroundColor:'#fff',
    borderRadius:8,
    justifyContent:"center",
    paddingHorizontal:16,
    marginTop:4
  },
  
});


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f0f0f7'
  },
  teacherList:{
    marginTop:-40,
    padding:16
  },
  searchForm:{
    marginBottom:8
  },
  label:{
    color:'#d4c2ff',

  },
  inputContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  inputBlock:{
    width:'48%'
  },
  input:{
    height:54,
    backgroundColor:'#fff',
    borderRadius:8,
    justifyContent:"center",
    paddingHorizontal:16,
    marginTop:4
  },
  submitButton:{
    backgroundColor:'#04d361',
    marginTop:20,
    height:56,
    borderRadius:8,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    

  },
  submitText:{
    color:'#fff',
    fontSize:18,
    fontWeight:"bold"
  }

})

export default TeacherList;