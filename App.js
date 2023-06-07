import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/layout/Menu';
import { DatabaseProvider } from './src/BD/DatabaseContext';

export default function App() {

  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Menu />
      </NavigationContainer>
    </DatabaseProvider>

  );
}

