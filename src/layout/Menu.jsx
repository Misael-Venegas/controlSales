import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../views/products/Products';
import Sales from '../views/sales/Sales';
import Information from '../views/information/Information';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DatabaseContext } from '../BD/DatabaseContext';

const Menu = () => {
  const db = useContext(DatabaseContext);

  const Tab = createBottomTabNavigator();
  
  useEffect(() => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, nombre_producto TEXT, precio REAL);',
          [],
          () => console.log('Tabla creada exitosamente'),
          error => console.log('Error al crear la tabla: ', error)
        );
      });
    }
  }, [db]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Sales':
              iconName = focused ? 'pricetag' : 'pricetag-outline';
              break;
            case 'Products':
              iconName = focused ? 'star' : 'star-outline';
              break;
            case 'Information':
              iconName = 'logo-usd';
              break;
          }

          return <Text><Ionicons name={iconName} size={size} color={color} /></Text>;
        },
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 0,
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
  );
};

export default Menu;
