import React,{useState,useEffect} from 'react';
import { View,Text,Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import api from '../../services/api';

const Landing: React.FC = () => {

  const navigation = useNavigation()

  const [connections, setConnections] = useState(0)

    useEffect(()=>{
        api.get('/connections').then(res =>{
            setConnections(res.data.total)
        })
    },[])

  

  return (
      <View style={styles.container} >
          <Image source={landingImg} style={styles.image} />

          <Text style={styles.title} >
            Seja bem-vindo, {'\n'}
            <Text style={styles.titleBold} >O que deseja fazer?</Text>
          </Text>

          <View style={styles.buttonsContainer} >
            <TouchableOpacity style={[styles.button, styles.primary]} onPress={()=>navigation.navigate('Study')} >
              <Image source={studyIcon} />
              <Text style={styles.buttonText} >Estudar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('GiveClasses')} style={[styles.button, styles.secondary]} >
              <Image source={giveClassesIcon} />
              <Text style={styles.buttonText} >Dar Aulas</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.connections} >
            Total de {connections} conexões ja realizadas {' '}
            <Image source={heartIcon} />
            </Text>

      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#8257e5',
    justifyContent:"center",
    padding:40,
  },
  image:{
    width:'100%',
    resizeMode:"contain",
  },
  title:{
    color:'#fff',
    fontSize:20,
    lineHeight:30,
    marginTop:80
  },
  titleBold:{
    fontWeight:'bold'
  },
  buttonsContainer:{
    flexDirection:"row",
    marginTop:40,
    justifyContent:"space-between"
  },
  button:{
    height:150,
    width:'48%',
    backgroundColor:'#333',
    borderRadius: 8,
    padding:24,
    justifyContent: "space-between",
    alignItems:"center",
  },
  primary:{
    backgroundColor:'#9871f5'
  },
  secondary:{
    backgroundColor:'#04d361'
  },
  buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:"bold"
  },
  connections:{
    color:'#d4c2ff',
    fontSize: 14,
    lineHeight: 20,
    maxWidth:150,
    marginTop:30,
  }
})

export default Landing;