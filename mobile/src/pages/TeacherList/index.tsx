import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Feather} from '@expo/vector-icons'
import Header from '../../components/Header';
import TeacherCard,{Teacher} from '../../components/TeacherCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';




const TeacherList: React.FC = () => {

  const [filterVisible, setFilterVisible] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])

  const [subject,setSubject] = useState('')
  const [week_day,setWeek_day] = useState('')
  const [time,setTime] = useState('')


  useEffect(()=>{
    getProffys()
  },[])


  const getProffys = async() =>{
    const res = await api.get('/classes',{
      params:{
        subject,
        week_day,
        time
    }})
    setTeachers(res.data)
    
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
            <Text style={styles.label} >Materia</Text>
            <TextInput
            placeholderTextColor='#c1bccc'
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder='Qual a materia?'
            />
            <View style={styles.inputContainer} >
              <View style={styles.inputBlock} >
                <Text style={styles.label} >Dia da semana</Text>
                <TextInput
                value={week_day}
                onChangeText={setWeek_day}
                placeholderTextColor='#c1bccc'
                style={styles.input}
                placeholder='Qual o dia?'
                />
              </View>
              <View style={styles.inputBlock} >
                <Text style={styles.label} >Horario</Text>
                <TextInput
                value={time}
                onChangeText={setTime}
                placeholderTextColor='#c1bccc'
                style={styles.input}
                placeholder='Qual o horario?'
                />
              </View>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={getProffys} >
              <Text style={styles.submitText} >Buscar</Text>
            </TouchableOpacity>
          </View>}
        </Header>
      <ScrollView style={styles.teacherList} contentContainerStyle={{paddingBottom:16}} >
        {teachers.map((teacher:Teacher)=><TeacherCard key={teacher.class.id} class={teacher.class}/>)}
        
      
      
    </ScrollView>
    </View>
  )
}

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