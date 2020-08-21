import React from 'react';
import { View,Text, StyleSheet, ImageBackground, Image, CheckBox,TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../assets/images/give-classes-background.png'

import Logo from '../../assets/images/logo.png'


const Login: React.FC = () => {

    const {navigate} = useNavigation()


  return (
     
      <View style={styles.container} >
           
          <View style={styles.background} >
            <ImageBackground style={styles.imgBackground} source={Background} >
                <Image source={Logo} style={styles.image} />
                <Text style={styles.logoTitle} >Sua plaforma de estudos online.</Text>
            </ImageBackground>
          </View>
         
        <View style={styles.bottom}>
            <View style={styles.bottomHeader}>
                <Text style={styles.loginText} >Fazer login</Text>
                <TouchableOpacity>
                    <Text style={styles.createText} > Criar uma conta</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.inputs}>
                
                <TextInput style={[styles.input,styles.input1]} keyboardType='email-address'  placeholder='E-mail' />
                <TextInput style={[styles.input, styles.input2]} secureTextEntry showSoftInputOnFocus placeholder='Senha'/>
                
            </View>
        
            <View style={styles.reminder} >
                <View style={styles.check} >
                    <CheckBox />
                    <Text style={styles.reminderText} >Lembrar-me</Text>
                </View>
                <TouchableOpacity onPress={()=> navigate('Forget')} >
                    <Text style={styles.reminderText} >Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} >Entrar</Text>
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
        resizeMode:"cover"   
    },
    image:{
        width:200,
        height:70,
        resizeMode:"contain"
    },
    bottom:{
        flex:1,
        padding:30
    },
    bottomHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    inputs:{
        backgroundColor:'#FAFAFC',
        borderRadius:8,
        marginVertical:10
    },
    input:{
        borderColor:'#E6E6f0',
        borderWidth:1,
        paddingHorizontal:12,
        paddingVertical:16,
    },
    input1:{
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },
    input2:{
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    reminder:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    check:{
        flexDirection:"row",
        alignItems:"center"
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
    loginText:{
        color:'#32264D',
        fontSize:24,
        fontWeight:'700',
        lineHeight:34
    },
    createText:{
        color:'#8257E5',
        fontSize:12,
        lineHeight:24
    },
    reminderText:{
        color:'#9C98A6',
        fontSize:12,
        lineHeight:24
    },
  
    buttonText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600',
        lineHeight:26
    }
})

export default Login;