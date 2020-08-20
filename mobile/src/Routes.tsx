import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'



import Landing from './pages/Landing'
import GiveClasses from './pages/giveClasses'
import TeacherList from './pages/TeacherList'
import Favorites from './pages/Favorites'
import Onboarding from './components/Onboarding'
import Login from './pages/Login'

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

const isSigned = false
const OnboardingView = false

const Home = () =>{
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} >
                {isSigned 
                ?
                <>
                    <Stack.Screen name='Landing' component={Landing} />
                    <Stack.Screen name='GiveClasses' component={GiveClasses} /> 
                    <Stack.Screen name='Study' component={TabsNAvigator} />
                </> 
                :
                <>
                <Stack.Screen name='Login' component={Login} /> 
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