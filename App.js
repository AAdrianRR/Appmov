import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './SRC/navigation/AppNavigator';
import { UserProvider } from './SRC/contexts/UserContext'; // Ajusta la ruta si es necesario

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
