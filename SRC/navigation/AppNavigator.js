import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Present from '../screens/Present';
import TabNavigator from './TabNavigator'; // ✅ donde vive el HomeStack

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Present" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Present" component={Present} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
