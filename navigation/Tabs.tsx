import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'

import {FaBell, FaUtensils} from 'react-icons/fa'

import { Home } from '../components'
import { Restaurent } from '../components'
import { Order } from '../components'
import NotFound from '../components/NotFound'
 

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
      <Tab.Navigator initialRouteName={'Home'}
          screenOptions={{
            tabBarInactiveBackgroundColor: "#011f3b",
            tabBarActiveBackgroundColor: "#032845",
            tabBarInactiveTintColor: "#f8ca12",
            tabBarActiveTintColor: "#ffffff",
            tabBarLabelStyle: { fontSize: 13, color: '#f8ca12', paddingBottom: 6},
            tabBarStyle: {height: 60, position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4, borderTopWidth: 0},
            headerShown: false,
            unmountOnBlur: true,
          }} 
      >
          <Tab.Screen name='Home' component={Home}
             options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused }) => (
                    <Image 
                       source={require('../static/images/diathia.png')}
                       resizeMode='contain'
                       style={{
                           width: 25, 
                           height: 20,
                           tintColor: focused ? 'red' : '#999'
                       }}
                    />
                )
              }} 
            />  
            <Tab.Screen name='Search' component={NotFound}
             options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ focused }) => (
                <Image 
                   source={require('../static/images/img_194915.png')}
                   resizeMode='contain'
                   style={{
                       width: 25, 
                       height: 20,
                       tintColor: focused ? 'red' : '#999'
                   }}
                />
            )
              }} 
            />  
            <Tab.Screen name='Like' component={NotFound}
             options={{
              tabBarLabel: 'Like',
              tabBarIcon: ({ focused }) => (
                <Image 
                   source={require('../static/images/img_127853.png')}
                   resizeMode='contain'
                   style={{
                       width: 25, 
                       height: 20,
                       tintColor: focused ? 'red' : '#999'
                   }}
                />
            )
              }} 
            />  
            <Tab.Screen name='User' component={NotFound}
             options={{
              tabBarLabel: 'User',
              tabBarIcon: ({ focused }) => (
                <Image 
                   source={require('../static/images/img_210318.png')}
                   resizeMode='contain'
                   style={{
                       width: 25, 
                       height: 20,
                       tintColor: focused ? 'red' : '#999'
                   }}
                />
            )
              }} 
            />  
      </Tab.Navigator>
    )
}

export default Tabs
