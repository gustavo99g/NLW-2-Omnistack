import React, { useState } from 'react';
import { View,Text,StyleSheet,Image,TouchableOpacity,Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import heartOutilineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api';


export interface Teacher {
    class:TeacherProps
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



const TeacherCard: React.FC<Teacher> = ({class:classProp}) => {


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

            <View style={styles.footer} >
                <Text style={styles.price} >
                    Preço/hora{'   '}
                    <Text style={styles.priceValue}>R$ {classProp.cost}</Text>
                </Text>
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

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#e6e6f0',
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
    price:{
        color:'#6a6180',
        fontSize:14
    },
    priceValue:{
        color:'#8257e5',
        fontSize:16
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