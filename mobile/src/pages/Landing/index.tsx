import React,{useState,useEffect, useContext} from 'react';
import { View,Text,Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import api from '../../services/api';
import AuthContext from '../../context/auth';
import LogoutImg from '../../assets/images/icons/Sair.png'

const Landing: React.FC = () => {

  const navigation = useNavigation()

  const [connections, setConnections] = useState(0)
  const {user,signOut} = useContext(AuthContext)

    useEffect(()=>{
        api.get('/connections').then(res =>{
            setConnections(res.data.total)
        })
    },[])

  

  return (
      <View style={styles.container} >
          <View style={styles.header} >
            <View style={styles.info} >
                <View style={{flexDirection:"row",alignItems:"center"}} >
                  <Image style={styles.infoImg} source={{uri:user?.avatar || 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png'}} />
                  <Text style={styles.infoText} >{user?.name} </Text>
                </View>
                <TouchableOpacity style={styles.buttonLogout} onPress={signOut} >
                  <Image source={LogoutImg} />
                </TouchableOpacity>
            </View>
            <Image source={landingImg} style={styles.image} />
          </View>

         <View style={styles.bottom} >
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
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center",
  },
  header:{
    backgroundColor:'#8257E5',
    padding:40,
    height:'50%'
  },
  info:{
    paddingVertical:20,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  infoImg:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight:10
  },
  infoText:{
    color:'#D4C2FF',
    fontSize:16,
    fontWeight:'600',
    lineHeight:22
  },
  buttonLogout:{
    backgroundColor:'#774DD6',
    padding:12,
    borderRadius:8
  },
  image:{
    width:'100%',
    resizeMode:"contain",
  },
  bottom:{
    padding:40
  },
  title:{
    color:'#6A6180',
    fontSize:20,
    lineHeight:30,
    
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
    color:'#9C98A6',
    fontSize: 14,
    lineHeight: 20,
    maxWidth:150,
    marginTop:30,
  }
})

export default Landing;