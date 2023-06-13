import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/layout/Menu';
import { DatabaseProvider } from './src/BD/DatabaseContext';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function App() {

  return (
    <View style={{ flex: 1 }} >
      <DatabaseProvider>
        <NavigationContainer>

          <Menu />
          <Toast ref={(ref) => Toast.setRef(ref)} />

        </NavigationContainer>
      </DatabaseProvider>
    </View>
  );
}

