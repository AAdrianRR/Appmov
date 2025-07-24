import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import Courses from '../screens/Courses';
import Home from '../screens/Home';
import KnowUs from '../screens/KnowUs';
import Pool from '../screens/Pool';
import Us from '../screens/Us';

import Levels from '../screens/Levels';
import Students from '../screens/Students';
import Teachers from '../screens/Teachers';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🧩 Stack para Home y sus rutas navegables
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Pool" component={Pool} />
    <Stack.Screen name="Us" component={Us} />
    <Stack.Screen name="KnowUs" component={KnowUs} />
    <Stack.Screen name="Courses" component={Courses} />
  </Stack.Navigator>
);

// 🔐 Pantalla para cerrar sesión (sin alerta, como tú la usas)
const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const cerrarSesion = async () => {
      try {
        await SecureStore.deleteItemAsync('jwt');
        await SecureStore.deleteItemAsync('rol');
        await SecureStore.deleteItemAsync('nombre');
      } catch (error) {
        console.log('🔴 Error al cerrar sesión:', error);
      } finally {
        navigation.replace('Login');
      }
    };
    cerrarSesion();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FFD700" />
      <Text style={{ marginTop: 10 }}>Cerrando sesión...</Text>
    </View>
  );
};

const TabNavigator = () => {
  const route = useRoute();
  const rol = route.params?.rol || '';

  if (!rol) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>
          Sesión no válida. Regresa al login.
        </Text>
      </View>
    );
  }

  const rutasPermitidas = [
    {
      name: 'Inicio',
      component: HomeStack,
      icon: 'home'
    },
    ...(rol === 'alumno'
      ? [{ name: 'Estudiante', component: Students, icon: 'school' }]
      : rol === 'profesor'
      ? [
          { name: 'Maestro', component: Teachers, icon: 'people' },
          { name: 'Niveles', component: Levels, icon: 'bar-chart' }
        ]
      : []),
    {
      name: 'Salir',
      component: LogoutScreen,
      icon: 'log-out'
    }
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#33B2B8'
        }
      }}
    >
      {rutasPermitidas.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icon} size={size} color={color} />
            )
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
