import React, { useEffect, useState } from 'react';

import { View,Text,StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Header from '../../components/Header';
import TeacherCard,{Teacher} from '../../components/TeacherCard';

// import { Container } from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(()=>{
    AsyncStorage.getItem('favorites').then(res=>{
      if (res){
        const favoriteTeachers = JSON.parse(res)
        
        setFavorites(favoriteTeachers)
      }
    })
  },[])


  return (
    <View style={styles.container} >
      <Header title='Meus proffys favoritos' />
      <ScrollView style={styles.teacherList} contentContainerStyle={{paddingBottom:16}} >
          {favorites.map((favorite:Teacher) => <TeacherCard key={favorite.id} teacher={favorite} favorited={true} />)}
        
      
      
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f0f0f7'
  },
  teacherList:{
    marginTop:-40,
    padding:16,
  }
})

export default Favorites;