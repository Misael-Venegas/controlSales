import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../views/Products';
import Sales from '../views/Sales';
import Information from '../views/Information';
import Ionicons from '@expo/vector-icons/Ionicons'
import { connectionBD } from '../BD/connection'
const Menu = () => {
    let db = null;
    useEffect(() => {
        db = connectionBD();
        console.log(db)
    }, [])


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
            <Tab.Screen name='Sales' component={Sales} />
            <Tab.Screen name='Products' component={Products} />
            <Tab.Screen name='Information' component={Information} />
        </Tab.Navigator>
    )
}

export default Menu