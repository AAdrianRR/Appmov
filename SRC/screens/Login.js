import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useContext, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_BASE } from '../constants/config';
import { UserContext } from '../contexts/UserContext'; // 🆕
import styles from '../styles/login.styles';

const Login = () => {
  const navigation = useNavigation();
  const { setUserData } = useContext(UserContext); // 🆕 sesión global
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [conectando, setConectando] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contraseña) {
      setError('Por favor ingresa tu correo y contraseña');
      return;
    }

    setConectando(true);
    setError('');

    try {
      console.log('🟡 Enviando a backend:', correo);
      const res = await axios.post(`${API_BASE}/auth/login`, {
        correo,
        contraseña
      });

      console.log('🟢 Respuesta recibida:', JSON.stringify(res.data, null, 2));

      const { token, rol, nombre } = res.data;

      if (!token || !rol) {
        console.log('⚠️ Datos incompletos:', { token, rol, nombre });
        setError('Respuesta incompleta del servidor.');
        return;
      }

      // 🔐 Guardamos sesión en contexto
      setUserData({
        token,
        rol,
        nombre
      });

      // 🔁 Opcional: guardar en SecureStore si quieres persistencia offline
      // import * as SecureStore from 'expo-secure-store';
      // if (Platform.OS !== 'web') {
      //   await SecureStore.setItemAsync('jwt', token);
      //   await SecureStore.setItemAsync('rol', rol);
      //   await SecureStore.setItemAsync('nombre', nombre || '');
      // }

      navigation.replace('MainApp', { rol }); // ✅ pasamos el rol al menú
    } catch (err) {
      console.log('🔴 Error en login:', err.response?.data || err.message);
      const mensaje = err.response?.data?.message || 'Error de red o credenciales';
      setError(mensaje);
    } finally {
      setConectando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/loginfondo.png')}
        style={styles.backgroundImage}
        blurRadius={5}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>¡Bienvenido!</Text>

        <Image
          source={require('../../assets/logo-dif.png')}
          style={styles.logo}
        />

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Correo o Usuario"
              placeholderTextColor="#aaaaaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={20} color="#FFD700" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              value={contraseña}
              onChangeText={setContraseña}
            />
          </View>

          {error !== '' && <Text style={styles.error}>{error}</Text>}
          {conectando && <Text style={styles.conectando}>🔄 Conectando...</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>INGRESAR</Text>
            <Icon name="arrow-forward" size={20} color="#1a1a2e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
