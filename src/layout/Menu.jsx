import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../views/Products';
import Sales from '../views/Sales';
import Information from '../views/Information';


const Menu = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name='Sales' component={Sales}  />
            <Tab.Screen name='Products' component={Products} />
            <Tab.Screen name='Information' component={Information} />
        </Tab.Navigator>
    )
}

export default Menu