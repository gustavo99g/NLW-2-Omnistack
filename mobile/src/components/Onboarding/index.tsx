import React from 'react';
import { View,Image,StyleSheet,ImageBackground,TouchableOpacity, Alert } from 'react-native';
import OnboardingScreen from 'react-native-onboarding-swiper'
import {useNavigation} from '@react-navigation/native'

import background from '../../assets/images/Background.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import studyIcon from '../../assets/images/icons/study.png'
import nextIcon from '../../assets/images/icons/next.png'

const Onboarding: React.FC = () => {


    const navigation = useNavigation()
  
    const NextButton:React.FC = ({...props}) =>{
        

        return (
            <TouchableOpacity {...props} style={styles.nextButton} >
                <Image source={nextIcon} />
            </TouchableOpacity>
            
        )
    }


    const handleDone = () =>{
        navigation.navigate('Landing')
    }

  
    return (     
            <OnboardingScreen  
                containerStyles={styles.container}
                titleStyles={styles.title}
                imageContainerStyles={styles.imageContainer}
                subTitleStyles={styles.subtitle}  
                showSkip={false}
                bottomBarHeight={120}
                onDone={handleDone}
                DoneButtonComponent={NextButton}
                NextButtonComponent={NextButton}
                bottomBarColor='#E5E5E5'
                pages={[
                    {
                    backgroundColor: '#E5E5E5',
                    image:<View style={[styles.Background,{ backgroundColor:'#8257E5'}]}>
                        <ImageBackground source={background} style={styles.imageBackground} >
                        <Image source={studyIcon} style={styles.image} /> 
                        </ImageBackground>
                    </View>,
                    title: '01.',
                    subtitle: 'Encontre vários professores para ensinar você',
                    
                },
                {
                    backgroundColor: '#E5E5E5',
                    image:<View style={[styles.Background,{ backgroundColor:'#04D361'}]}>
                        <ImageBackground source={background} style={styles.imageBackground} >
                        <Image source={giveClassesIcon} style={styles.image} /> 
                        </ImageBackground>
                    </View>,
                    title: '02.',
                    subtitle: 'Ou dê aulas sobre o que você mais conhece',
                    
            }
            ]}
            />
 
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flex:1,
        backgroundColor:'#E5E5E5'
    },
    imageContainer:{
        height:'52%',
 
    },
    Background:{ 
        width:'100%',
        height:'100%',   
        padding:30
    },
    imageBackground:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        
    },
    image:{
        width:100,
        height:90,      
    },
    title:{
        color: '#6A6180',
        opacity: 0.16,
        fontWeight: "500",
        fontSize: 40,
        lineHeight: 44,
        paddingLeft:15
        
    },
    subtitle:{
        fontWeight:'500',
        fontSize:24,
        lineHeight:34,
        color:'#6A6180',
        maxWidth:220,
        textAlign:"left",
        paddingLeft:15
    },
    nextButton:{
        marginRight:25
    }
})

export default Onboarding;