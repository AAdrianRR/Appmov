import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Courses from '../screens/Courses';
import Home from '../screens/Home';
import KnowUs from '../screens/KnowUs';
import Pool from '../screens/Pool';
import Us from '../screens/Us';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Pool" component={Pool} />
    <Stack.Screen name="Us" component={Us} />
    <Stack.Screen name="KnowUs" component={KnowUs} />
    <Stack.Screen name="Courses" component={Courses} />
  </Stack.Navigator>
);

export default HomeStack;
