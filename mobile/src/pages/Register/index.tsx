import React, { useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet,TextInput,KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';


// import { Container } from './styles';

const Register: React.FC = () => {

    const {goBack} = useNavigation()
    const [name,setName] = useState('')
    const [lastName,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {navigate} = useNavigation()

    const handleSubmit =async() =>{
        const data ={
            name,
            lastName,
            email,
            password
        }

        try{
            await api.post('/users', data)
            Alert.alert('Dados salvos com sucesso','Clique em ok para voltar ao login',[{onPress:()=>navigate('Login')}])
            
            
        }catch(err){
            Alert.alert('Falha ao cadastrar os dados, tente novamente mais tarde')
        }
    }


    

  return (
      <View style={styles.container} >
        <TouchableOpacity onPress={goBack} >
            <Ionicons name="ios-arrow-round-back" size={35} color="#9C98A6" />
        </TouchableOpacity>
          <Text style={styles.title} >Crie sua conta gratuita</Text>
          <Text style={styles.titleText} >Basta preencher esses dados e você estará conosco.</Text>

          <KeyboardAvoidingView behavior="position">
            <View  style={styles.inputs}>             
                <TextInput style={[styles.input,styles.input1]} onChangeText={setName} placeholder='Nome' />
                <TextInput style={styles.input} placeholder='Sobrenome' onChangeText={setLastname} />
                <TextInput style={styles.input} keyboardType='email-address' onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} placeholder='E-mail' />
                <TextInput style={[styles.input, styles.input2]} onChangeText={setPassword} placeholder='Senha' secureTextEntry />
                
            </View>
            
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
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