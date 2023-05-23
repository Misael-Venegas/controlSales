import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/layout/Menu';

export default function App() {

  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>

  );
}

