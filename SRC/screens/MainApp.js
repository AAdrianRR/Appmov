import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from '../styles/mainapp.styles';

const MainApp = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      const nombreGuardado = await SecureStore.getItemAsync('nombre');
      const rolGuardado = await SecureStore.getItemAsync('rol');

      if (!rolGuardado || !nombreGuardado) {
        navigation.replace('Login'); // datos faltantes → volver al login
        return;
      }

      setNombre(nombreGuardado);
      setRol(rolGuardado);
    } catch (err) {
      console.log('❌ Error al cargar SecureStore:', err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (Platform.OS !== 'web') {
      cargarDatos();
    }
  }, []);

  const cerrarSesion = async () => {
    await SecureStore.deleteItemAsync('jwt');
    await SecureStore.deleteItemAsync('rol');
    await SecureStore.deleteItemAsync('nombre');
    navigation.replace('Login');
  };

  const irAPanel = () => {
    if (rol === 'alumno') {
      navigation.navigate('PanelAlumno');
    } else if (rol === 'profesor') {
      navigation.navigate('PanelProfesor');
    } else {
      setRol('');
    }
  };

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.info}>Cargando datos de sesión...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>Bienvenido, {rol} {nombre} 🎓</Text>

      <TouchableOpacity style={styles.boton} onPress={irAPanel}>
        <Text style={styles.botonTexto}>Ir a mi panel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={cerrarSesion}>
        <Text style={styles.logoutTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainApp;
