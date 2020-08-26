import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Image,Text,ScrollView, TextInput, TouchableOpacity, NativeEventEmitter } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'

import AuthContext from '../../context/auth';
import api from '../../services/api';


const Profile: React.FC = () => {
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


   
    const [name,setName] = useState('')
    const [lastname,setLastname] = useState('')
    const [avatar,setAvatar] = useState('')
    const [email,setEmail] = useState('')
    const [whatsapp,setWhatsapp] = useState('')
    const [bio,setBio] = useState('')
    const [cost,setCost] = useState('')
    const [subject,setSubject] = useState('')
    const [scheduleItems, setScheduleItems] = useState([
        {week_day:1, from:'', to:''},
      ])

    const handleAddSchedule = () =>{
    setScheduleItems([...scheduleItems, {
      week_day:1,
      from:'',
      to:''
        }])
    }   

    useEffect(()=>{
        async function loadData(){
            const res = await api.get('/users')
            const {subject,name,lastName,avatar,cost,email,whatsapp,bio} = res.data.user[0]
            setSubject(subject)
            setName(name)
            setLastname(lastName)
            setAvatar(avatar)
            setCost(cost.toString())
            setEmail(email)
            setBio(bio)
            setWhatsapp(whatsapp)

        }
        loadData()
    },[])

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
      <View style={styles.container} >
          <View style={styles.header} >
                <Image source={{uri:avatar ||'' }} style={styles.image} />
                <Text style={styles.nameText} >{name +' '+lastname}</Text>
                <Text style={styles.subjectText} >{subject}</Text>
          </View>
          <ScrollView style={styles.bottom} contentContainerStyle={{paddingBottom:16}} >
            <View style={styles.form} >
                <Text style={styles.title} >Seus Dados</Text>
                <View style={styles.hr} />

                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} placeholder='Nome' value={name} onChangeText={setName} />
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput style={styles.input} placeholder='Sobrenome' value={lastname} onChangeText={setLastname}/>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='E-mail' value={email} onChangeText={setEmail}/>
                <Text style={styles.label}>Avatar</Text>
                <TextInput style={styles.input} placeholder='Avatar' value={avatar} onChangeText={setAvatar}/>
                <Text style={styles.label}>Whatsapp</Text>
                <TextInput style={styles.input} placeholder='Whatsapp'value={whatsapp} onChangeText={setWhatsapp} />
                <Text style={styles.label}>Bio</Text>
                <TextInput style={styles.input}multiline={true} numberOfLines={5} placeholder='Bio'value={bio} onChangeText={setBio} />
                
                
                <Text style={styles.title}>Sobre a aula</Text>
                <View style={styles.hr} />
                <Text style={styles.label}>Materia</Text>
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

                <Text style={styles.label}>Custo da sua hora por aula</Text>
                <TextInput style={styles.input} placeholder='Custo' value={cost} onChangeText={setCost}/>

                <View style={styles.times} >
                    <Text style={styles.title} >Horários disponiveis</Text>
                    <TouchableOpacity onPress={handleAddSchedule} >
                        <Text style={styles.newText} >+ Novo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hr} />
                {scheduleItems.map((schedule,index)=>(
                    <View key={index} >
                       
                        <Text style={styles.label}>Dia da semana</Text>
                        <RNPickerSelect style={pickerSelectStyles} 
                        placeholder={{label:'Selecione'}} 
                        useNativeAndroidPickerStyle={false} 
                        value={schedule.week_day}
                        onValueChange={(e)=>handleScheduleItemValue(index, 'week_day',e)} 
                        items={[
                            {label:'Segunda', value:'1'},
                            {label:'Terça', value:'2'},
                            {label:'Quarta', value:'3'},
                            {label:'Quinta', value:'4'},
                            {label:'Sexta', value:'5'},
                        ]}/>

                        <View style={styles.timeBlock} >
                            <View style={styles.timeBlockView} >
                            <Text style={styles.label}>Das</Text>
                            
                            <RNPickerSelect 
                                placeholder={{label:'Selecione'}}  
                                style={pickerSelectStyles} 
                                items={timer} 
                                value={schedule.from}
                                onValueChange={(e)=>handleScheduleItemValue(index, 'from',e)}
                                useNativeAndroidPickerStyle={false} 
                                />
                        
                            </View>
                            <View style={styles.timeBlockView}>
                            <Text style={styles.label}>Até</Text>
                            
                                <RNPickerSelect 
                                placeholder={{label:'Selecione'}}  
                                style={pickerSelectStyles} 
                                items={timer} 
                                value={schedule.to}
                                onValueChange={(e)=>handleScheduleItemValue(index, 'to',e)}
                                useNativeAndroidPickerStyle={false} 
                                />
                                
                            </View>
                        </View>
                        <View style={styles.footer} >
                            <View style={[styles.hr,{width:'30%'}]} />
                                <TouchableOpacity onPress={()=>handleDeleteSchedule(index)} >
                                    <Text style={styles.buttonText} >Excluir horario</Text>
                                </TouchableOpacity>
                            <View style={[styles.hr,{width:'30%'}]} />
                        </View>
                    </View>
                ))}
                
            </View>
            <View style={styles.buttonContainer} >
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonTextSave} >Salvar alterações</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#E6E6F0',
      backgroundColor:'#FAFAFC',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
      marginVertical:8
    },
    
  });

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:16,
        backgroundColor:'#E5E5E5'
    },
    header:{
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'#8257E5',
        padding:40
    },
    image:{
        width:120,
        height:120,
        borderRadius:60
    },
    nameText:{
        fontSize:24,
        lineHeight:25,
        color:'#ffffff',
        fontWeight:"bold",
        marginTop:16
    },
    subjectText:{
        color:'#D4C2FF',
        fontSize:16,
        lineHeight:26,
        marginTop:5
    },
    bottom:{
        padding:16,
        marginTop:-40,
        borderRadius:8,
    },
    form:{
        backgroundColor:'#fff',       
        
        padding:20,
        borderWidth:1,
        borderColor:'#e6e6f0',
    },
    hr:{
        borderWidth:1,
        borderColor:'#E6E6F0',
        marginTop:10,
        marginBottom:18
    },
    title:{
        fontWeight:'700',
        fontSize:22,
        lineHeight:30,
        color:'#32264D'
    },
    input:{
        paddingVertical:8,
        paddingHorizontal:20,
        backgroundColor:'#FAFAFC',
        marginVertical:8,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#E6E6F0',
     
    },
    newText:{
        color:'#8257E5',
        fontWeight:"bold",
        fontSize:16
    },
    label:{
        color:'#9C98A6',
        fontSize:12
    },
    times:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    timeBlock:{
        flexDirection:"row",
        justifyContent:"space-between"
        
    },
    timeBlockView:{
        width:'48%'
    },
    footer:{
        flexDirection:"row",
        justifyContent:"space-between",       
    },
    buttonText:{
        color:'#E33D3D',
        fontSize:14,
        lineHeight:20,
        fontWeight:"bold",
     
    },
    buttonContainer:{
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
        padding:20,
        backgroundColor:'#FAFAFC',
        borderWidth:1,
        borderColor:'#e6e6f0',
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#04D361',
        paddingVertical:16,
        borderRadius:8,
    },
    buttonTextSave:{
        color:'#fff',
        fontSize:16,
        lineHeight:26
    }
  
})

export default Profile;