import React, { useState } from 'react';
import { View,Text,StyleSheet,Image,TouchableOpacity,Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components/native';



import heartOutilineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import ArrowIcon from '../../assets/images/icons/Group.png'
import api from '../../services/api';


export interface Teacher {
    class:TeacherProps
    schedule:Array<scheduleProps>
}

interface scheduleProps{
  week_day:number
  from:number
  to:number
}

interface TeacherProps {
    id:number,
    avatar:string,
    bio:string,
    cost:string,
    name:string,
    subject:string,
    whatsapp:string
 
}
interface ViewProps {
    opacity:boolean
}


const TeacherCard: React.FC<Teacher> = ({class:classProp,schedule}) => {

    const days =[
        {value:1, label:'Segunda'},
        {value:2, label:'Terça'},
        {value:3, label:'Quarta'},
        {value:4, label:'Quinta'},
        {value:5, label:'Sexta'},
]

    const handleNewConnection =() =>{
        api.post('/connections', {user_id:classProp.id})
        Linking.openURL(`whatsapp://send?phone=${classProp.whatsapp}`)
      }

  return (
      <View style={styles.container}>
          <View style={styles.profile}>
            <Image 
            style={styles.avatar}
            source={{uri:classProp.avatar}}
            />
            <View style={styles.profileInfo}>
                <Text style={styles.name} >{classProp.name} </Text>
                <Text style={styles.subject} >{classProp.subject}</Text>
            </View>
            </View>
            <Text style={styles.bio} >
                {classProp.bio}
            </Text>
            <View style={styles.hr} />
            <View style={styles.times} >
                <View style={styles.title} >
                    <Text style={styles.titleText} >Dia</Text>
                    <Text style={styles.titleText} >Horario</Text>
                </View>
                {days.map(day =>(
                    <DayContainer key={day.label} opacity={schedule.some(sche=>sche.week_day === day.value)}>
                        <Text style={styles.dayText} >{day.label}</Text>
                        <Image source={ArrowIcon} />
                    <Text style={styles.dayText}>{schedule.map(sche => day.value === sche.week_day ? `${sche.from/60}h - ${sche.to/60}h`: '')}</Text>
                    </DayContainer>
                ))}
               
            </View>
            
            <View style={styles.footer} >
                <View style={styles.priceContainer} >
                    <Text style={styles.price} >
                        Preço da minha hora:                 
                    </Text>
                    <Text style={styles.priceValue}>R$ {classProp.cost},00 reais </Text>
                </View>
                <View style={styles.buttonsContainer} >
                    <TouchableOpacity style={styles.favorite} >
                     <Image source={heartOutilineIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contact} onPress={(handleNewConnection)} >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactText} >Entrar em contato</Text>
                    </TouchableOpacity>
                </View>

                </View>

        </View>
  )
}

const DayContainer = styled.View<ViewProps>`
        margin-top:8px;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        background-color:#FAFAFC;
        padding:8px 16px;
        border-radius:8px;
        border:1px solid #e6e6f0;
        opacity:${props=>props.opacity ? 1 :0.5}
`

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#E5E5E5',
        borderRadius:8,
        marginBottom:16,
        overflow:"hidden"
    },
    profile:{
        flexDirection:"row",
        
        alignItems:"center",
        padding:24
    },
    avatar:{
        width:64,
        height:64,
        borderRadius:32,
        backgroundColor:'#eee'
    },
    profileInfo:{
        marginLeft:16,
    },

    hr:{
        borderWidth:1,
        borderColor:'#E6E6F0',
        marginTop:10,
        marginBottom:18
    },
    times:{
        paddingHorizontal:24,
        paddingVertical:8,
        borderBottomWidth:1,
        borderColor:'#E5E5E5',
        paddingBottom:16

    },
    title:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:16
    },
    titleText:{
        color:'#9C98A6',
        fontSize:12,
        lineHeight:15
    },
    
    dayText:{
        color:'#6A6180',
        fontSize:16,
        lineHeight:21,
        fontWeight:"bold"
    },
    name:{
        color:'#32244d',
        fontSize:20,
        fontWeight:"bold"
    },
    subject:{
        color:'#6a6180',
        fontSize:12,
        marginTop:4
    },
    bio:{
        marginHorizontal:24,
        fontSize:14,
        lineHeight:24,
        color:'#6a6180'
    },
    footer:{
        backgroundColor:'#fafafc',
   
        padding:24,
        alignItems:"center"
    },
    priceContainer:{
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between"
    },
    price:{
        color:'#6a6180',
        fontSize:16,
        justifyContent:"space-between"
    },
    priceValue:{
        color:'#8257e5',
        fontSize:16,
        fontWeight:"bold"
    },
    buttonsContainer:{
        flexDirection:"row",
        marginTop:16
    },
    favorite:{
        backgroundColor:'#8257e5',
        width:56,
        height:56,
        borderRadius:8,
        justifyContent:"center",
        alignItems:"center",
        marginRight:8
    },
    favorited:{
        backgroundColor:'#e33d3d'
    },
    contact:{
        backgroundColor:'#04d361',
        flex:1,
        height:56,
        borderRadius:8,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginRight:8
    },
    contactText:{
        color:'#fff',
        fontSize:16,
        marginLeft:16
    }


})

export default TeacherCard;