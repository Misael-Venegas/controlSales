import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../views/products/Products';
import Sales from '../views/sales/Sales';
import Information from '../views/information/Information';
import Ionicons from '@expo/vector-icons/Ionicons'
import db from '../BD/connection'
const Menu = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;


                    switch (route.name) {
                        case 'Sales':
                            iconName = focused ? 'pricetag' : 'pricetag-outline'

                            break;
                        case 'Products':
                            iconName = focused ? 'star' : 'star-outline'

                            break;

                        case 'Information':
                            iconName = 'logo-usd'
                            break
                    }

                    return <Text><Ionicons name={iconName} size={size} color={color} /></Text>
                }, tabBarStyle: {
                    height: 60,
                    paddingHorizontal: 5,
                    paddingTop: 0,

                    // backgroundColor: '#FFEB3B',
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name='Sales' component={Sales} initialParams={{ db: db }} />
            <Tab.Screen name='Products' component={Products} initialParams={{ db: db }} />
            <Tab.Screen name='Information' component={Information} initialParams={{ db: db }} />
        </Tab.Navigator>
    )
}

export default Menu