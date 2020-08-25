import React, { useContext } from 'react';
import { View, StyleSheet, Image,Text } from 'react-native';
import AuthContext from '../../context/auth';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const Profile: React.FC = () => {

    const {user} = useContext(AuthContext)

  return (
      <View style={styles.container} >
          <View style={styles.header} >
                <Image source={{uri:user?.avatar}} style={styles.image} />
                <Text style={styles.nameText} >{user?.name}</Text>
                <Text style={styles.subjectText} >Matematica</Text>
          </View>
          <ScrollView style={styles.bottom} contentContainerStyle={{paddingBottom:16}} >
            <View style={styles.form} >
                <Text style={styles.title} >Seus Dados</Text>
                <View style={styles.hr} />

                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} placeholder='Nome' />
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput style={styles.input} placeholder='Sobrenome' />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='E-mail' />
                <Text style={styles.label}>Avatar</Text>
                <TextInput style={styles.input} placeholder='Avatar' />
                <Text style={styles.label}>Whatsapp</Text>
                <TextInput style={styles.input} placeholder='Whatsapp' />
                <Text style={styles.label}>Bio</Text>
                <TextInput style={styles.input}multiline={true} numberOfLines={5} placeholder='Bio' />
                
                
                <Text style={styles.title}>Sobre a aula</Text>
                <View style={styles.hr} />
                <Text style={styles.label}>Materia</Text>
                <TextInput style={styles.input} placeholder='Materia' />
                <Text style={styles.label}>Custo da sua hora por aula</Text>
                <TextInput style={styles.input} placeholder='Custo' />

                <View style={styles.times} >
                    <Text style={styles.title} >Horários disponiveis</Text>
                    <TouchableOpacity>
                        <Text style={styles.newText} >+ Novo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hr} />
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput style={styles.input} placeholder='Dia da semana' />
                <View style={styles.timeBlock} >
                    <View style={styles.timeBlockView} >
                    <Text style={styles.label}>Das</Text>
                    <TextInput style={styles.input} placeholder='8horas' />
                    </View>
                    <View style={styles.timeBlockView}>
                    <Text style={styles.label}>Até</Text>
                    <TextInput style={styles.input} placeholder='18horas' />
                    </View>
                </View>
                <View style={styles.footer} >
                    <View style={[styles.hr,{width:'30%'}]} />
                        <TouchableOpacity  >
                            <Text style={styles.buttonText} >Excluir horario</Text>
                        </TouchableOpacity>
                    <View style={[styles.hr,{width:'30%'}]} />
                </View>

            </View>
          </ScrollView>
      </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1
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
    
    },
    form:{
        backgroundColor:'#fff',       
        borderRadius:8,
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
        flex:1
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
  
})

export default Profile;