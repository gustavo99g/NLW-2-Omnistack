import React, { useContext } from 'react';
import { View, StyleSheet, Image,Text } from 'react-native';
import AuthContext from '../../context/auth';

const Profile: React.FC = () => {

    const {user} = useContext(AuthContext)

  return (
      <View style={styles.container} >
          <View style={styles.header} >
                <Image source={{uri:user?.avatar}} style={styles.image} />
                <Text>{user?.name}</Text>
                <Text>Matematica</Text>
          </View>
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
        width:70,
        height:70,
        borderRadius:35
    }
})

export default Profile;