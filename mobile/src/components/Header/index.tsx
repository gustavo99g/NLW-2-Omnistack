import React, { ReactNode } from 'react';
import { View,StyleSheet,TouchableOpacity,Image,Text } from 'react-native';


interface HeaderProps{
  title:string,
  headerRight?:ReactNode
}

const Header: React.FC<HeaderProps> = ({title,children,headerRight}) => {
  

  return (
    <View style={styles.container} >
        <View style={styles.topBar}>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center"}} > 
        <Text style={styles.title} >{title}</Text>
        {headerRight}
        </View>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      padding:20,
      paddingBottom:60,
      backgroundColor:'#8257e5'
    },
    topBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    title:{
      color:'#fff',
      fontSize:24,
      lineHeight: 32,
      maxWidth:160,
      marginVertical:20,
    }
})

export default Header;