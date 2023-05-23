import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/layout/Menu';
import Ionic from 'react-native-vector-icons'

export default function App() {

  return (
    <NavigationContainer>
    
      <Menu />
    </NavigationContainer>

  );
}

