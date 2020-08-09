import React from 'react';
import { View,Text, StyleSheet,ImageBackground } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import giveClassesImg from '../../assets/images/give-classes-background.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

const GiveClasses: React.FC = () => {
    const navigation = useNavigation()

    
    return (
      <View style={styles.container} >
          <ImageBackground resizeMode='contain' source={giveClassesImg} style={styles.background} >
            <Text style={styles.title} >Quer ser um proffy?</Text>
            <Text style={styles.desc} >
                Para começar, voce precisa se cadastrar como professor em nossa plataforma web 
            </Text>
          </ImageBackground>
          <TouchableOpacity style={styles.okButton} onPress={()=> navigation.goBack()} >
              <Text style={styles.textButton} >Tudo bem</Text>
          </TouchableOpacity>
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
    background:{
        flex:1,
        justifyContent:"center"
    },
    title:{
        color:'#fff',
        fontSize:32,
        lineHeight:37,
        maxWidth:180,
        fontWeight:"bold"
    },
    desc:{
        marginTop:24,
        color:'#d4c2ff',
        fontSize:16,
        lineHeight:26,
        maxWidth:240
    },
    okButton:{
        marginVertical:40,
        backgroundColor:'#04d361',
        height:58,
        alignItems:"center",
        justifyContent: "center",
        borderRadius:8
    },
    textButton:{
        fontSize:18,
        color:'#fff',
        fontWeight:"bold"
    }
})

export default GiveClasses;