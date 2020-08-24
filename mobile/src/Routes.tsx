import React,{useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'



import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import Favorites from './pages/Favorites'
import Onboarding from './components/Onboarding'
import Login from './pages/Login'
import Forget from './pages/Forget'
import Register from './pages/Register'
import AuthContext from './context/auth';
import Profile from './pages/Profile';
import logoImg from './assets/images/logo.png'
import { Image } from 'react-native';

const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const TabsNAvigator = () =>{
    return(
    <Tabs.Navigator
        tabBarOptions={{
            style:{
                elevation:0,
                height:64
            },
            tabStyle:{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
            },
            iconStyle:{
                flex:0,
                width:20,
                height:30
            },
            labelStyle:{
                fontSize:13,
                marginLeft:16
            },
            inactiveBackgroundColor:'#fafafc',
            activeBackgroundColor:'#ebebf5',
            inactiveTintColor:'#c1bccc',
            activeTintColor:'#32264d',

        }}
    >
        <Tabs.Screen 
        name='TeacherList' 
        component={TeacherList}
        options={{
            tabBarLabel:'Proffys',
            tabBarIcon:({color,focused})=><Ionicons name='ios-easel' size={24} color={focused ? '#8257e5' : color} />
        }}
        />
        <Tabs.Screen 
        name='Favorites' 
        component={Favorites}
        options={{
            tabBarLabel:'Favoritos',
            tabBarIcon:({color,focused})=><Ionicons name='ios-heart' size={24} color={focused ? '#8257e5' : color}/>
        }}
        />
    </Tabs.Navigator>
    )
}

const OnboardingView = false

const Home = () =>{

    const {signed:isSigned} = useContext(AuthContext)
    return (
        <Stack.Navigator screenOptions={{
            headerRight:()=><Image source={logoImg} style={{marginRight:20,width:45,height:15}}  />,
        
            headerTintColor:'#fff',
            headerTitleAlign:'center',
                headerTitleStyle:{
                    color:'#D4C2FF',
                    fontSize:18,
                    lineHeight:24
                },
                headerStyle:
                {
                    backgroundColor:'#774DD6',
                    
                }}} >
                {isSigned 
                ?
                <>
                    <Stack.Screen name='Landing' component={Landing} options={{headerShown:false}} />
                    <Stack.Screen name='Profile' options={{title:'Ver Perfil'}} component={Profile} /> 
                    <Stack.Screen name='Study' component={TabsNAvigator} options={{title:'Estudar'}} />
                </> 
                :
                <>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}} /> 
                <Stack.Screen name='Forget' component={Forget} options={{headerShown:false}} /> 
                <Stack.Screen name='Register' component={Register} options={{headerShown:false}} />
                </>
                }             
        </Stack.Navigator>
    )
}

const Routes: React.FC = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} >
               
                <Stack.Screen name='Onboarding' component={Onboarding} />
                <Stack.Screen name='Home' component={Home} />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;