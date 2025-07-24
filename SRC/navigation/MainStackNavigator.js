import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Pool from '../screens/Pool';
import Us from '../screens/Us';
import KnowUs from '../screens/KnowUs';
import Courses from '../screens/Courses';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pool" component={Pool} />
      <Stack.Screen name="Us" component={Us} />
      <Stack.Screen name="KnowUs" component={KnowUs} />
      <Stack.Screen name="Courses" component={Courses} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
