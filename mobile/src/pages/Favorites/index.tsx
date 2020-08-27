import React, { useEffect, useState } from 'react';

import { View,StyleSheet,ScrollView } from 'react-native';
import Header from '../../components/Header';
import TeacherCard,{Teacher} from '../../components/TeacherCard';
import api from '../../services/api';


const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])
  const [refresh,setRefresh] = useState(false)


  
  useEffect(()=>{
    async function getFavorite(){
      const res = await api.get('/favorites')
      setFavorites(res.data)
      }
    
    getFavorite()
  },[refresh])



  return (
    <View style={styles.container} >
      <Header title='Meus proffys favoritos' />
      <ScrollView style={styles.teacherList} contentContainerStyle={{paddingBottom:16}} >
          {favorites.map((favorite:Teacher) => <TeacherCard 
          key={favorite.class.id} 
          favorite={true} 
          class={favorite.class} 
          schedule={favorite.schedule}
          refreshFunc={()=>setRefresh(!refresh)}
          />)}
        
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