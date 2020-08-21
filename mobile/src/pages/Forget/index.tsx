import React from 'react';
import { View,Text, StyleSheet, ImageBackground, Image,TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Background from '../../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/images/logo.png'


const Forget: React.FC = () => {

    const {goBack} = useNavigation()

  return (
     
      <View style={styles.container} >
           
          <View style={styles.background} >
            <ImageBackground style={styles.imgBackground} source={Background} >
                <Image source={Logo} style={styles.image} />
                <Text style={styles.logoTitle} >Sua plaforma de estudos online.</Text>
            </ImageBackground>
          </View>
            
            <View style={styles.bottom} >
                <TouchableOpacity onPress={goBack} >
                <Ionicons name="ios-arrow-round-back" size={35} color="#9C98A6" />
                </TouchableOpacity>
                <Text style={styles.forgetText} >Esqueceu a senha?</Text>
                <Text style={styles.descText} >Não esquenta, vamos dar um jeito nisso. </Text> 
                <TextInput style={styles.input} keyboardType='email-address'  placeholder='E-mail' />
            
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText} >Enviar</Text>
                </TouchableOpacity>
            </View>
      
      </View>
      
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        height:'40%',     
        backgroundColor:'#8257E5',
        
    },
    imgBackground:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        resizeMode:'contain'
    },
    image:{
        width:200,
        height:70,
        resizeMode:"contain"
    },
    bottom:{
        flex:1,
        padding:25,
        backgroundColor:'#E5E5E5'
    },
    input:{
        backgroundColor:'#FAFAFC',
        borderRadius:8,
        paddingHorizontal:12,
        paddingVertical:16,
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#04D361',
        paddingVertical:16,
        borderRadius:8,
        marginVertical:12
    },
    logoTitle:{
        color:'#D4C2FF',
        fontSize:18,
        maxWidth:200
    },
    forgetText:{
        color:'#32264D',
        fontSize:24,
        fontWeight:'700',
        lineHeight:34,
        marginTop:12
    },
    descText:{
        color:'#6A6180',
        fontSize:14,
        lineHeight:24,
        maxWidth:150,
        marginVertical:18
    },
  
    buttonText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600',
        lineHeight:26
    }
})

export default Forget;