import React from 'react'
import { Text, TextInput, View, Image, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home, Restaurent, Order } from './components'
import Tabs from './navigation/Tabs'

const Stack = createNativeStackNavigator()

const App = () => {
    const test = 'sddsfsdfdfanh toi'
    return ( 
       <NavigationContainer>
         <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName={'Tabs'}
         >
           <Stack.Screen name='Tabs' component={Tabs} />
           <Stack.Screen name='Restaurent' component={Restaurent} />
           <Stack.Screen name='Order' component={Order} />
          </Stack.Navigator>
       </NavigationContainer>
    )
}

export default App