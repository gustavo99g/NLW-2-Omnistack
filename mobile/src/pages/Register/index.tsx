import React, { useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet,TextInput,KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


// import { Container } from './styles';

const Register: React.FC = () => {


    const {goBack} = useNavigation()
    

  return (
      <View style={styles.container} >
        <TouchableOpacity onPress={goBack} >
            <Ionicons name="ios-arrow-round-back" size={35} color="#9C98A6" />
        </TouchableOpacity>
          <Text style={styles.title} >Crie sua conta gratuita</Text>
          <Text style={styles.titleText} >Basta preencher esses dados e você estará conosco.</Text>

          <KeyboardAvoidingView behavior="position">
            <View  style={styles.inputs}>             
                <TextInput style={[styles.input,styles.input1]}  placeholder='Nome' />
                <TextInput style={styles.input} placeholder='Sobrenome' />
                <TextInput style={styles.input} keyboardType='email-address' placeholder='E-mail' />
                <TextInput style={[styles.input, styles.input2]} placeholder='Senha' secureTextEntry />
                
            </View>
            
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText} >Registrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
      </View>
  )
}


const styles = StyleSheet.create({
    container:{ 
        padding:30,
        flex:1
    },
    title:{
        color:'#32264D',
        fontWeight:"700",
        fontSize:32,
        lineHeight:42,
        maxWidth:205,
        marginTop:25
    },
    titleText:{
        marginVertical:30,
        color:'#6A6180',
        fontSize:14,
        lineHeight:24
    },
    inputs:{
        backgroundColor:'#FAFAFC',
        borderRadius:8,
        marginVertical:10,
       
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
    button:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#04D361',
        paddingVertical:16,
        borderRadius:8,
        marginVertical:12
    },
    buttonText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'600',
        lineHeight:26
    }
})

export default Register;