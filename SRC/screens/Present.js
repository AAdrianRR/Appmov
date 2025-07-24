import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const Present = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/Fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Bienvenidos a una aplicación creada por</Text>
        <Text style={styles.brand}>CodeSync D&A</Text>

        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
        />

        <Text style={styles.sectionTitle}>¿Quiénes somos?:</Text>
        <Text style={styles.sectionText}>
          Una empresa encargada de el desarrollo de soluciones tecnológicas enfocadas en software inteligente e integración de dispositivos IoT, orientadas a mejorar la conectividad, la eficiencia operativa y la transformación digital de empresas e instituciones.
        </Text>

        <Text style={styles.sectionTitle}>Desarrolladores:</Text>
        <View style={styles.developersRow}>
          <View style={styles.devContainer}>
            <Image
              source={require('../../assets/diego.jpg')}
              style={styles.devPhoto}
            />
            <Text style={styles.devText}>Diego Soto</Text>
            <Text style={styles.devText}>Desarrollador de</Text>
            <Text style={styles.devText}>Front End</Text>
          </View>
          <View style={styles.devContainer}>
            <Image
              source={require('../../assets/adrian.jpg')}
              style={styles.devPhoto}
            />
            <Text style={styles.devText}>Adrián Romero</Text>
            <Text style={styles.devText}>Desarrollador de</Text>
            <Text style={styles.devText}>Back End</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Visita nuestra aplicación sobre el curso de natación del DIF</Text>
        <Text style={styles.sectionText}>
          Visita nuestra pagina donde implementamos un sistema digital que permita monitorear los niveles de la alberca mediante sensores y facilitar la gestión administrativa del curso de natación del DIF.
        </Text>

        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Ir al Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
  },
  brand: {
    fontSize: 26,
    color: '#B388FF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#B388FF',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 10,
  },
  sectionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'justify',
  },
  developersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  devContainer: {
    alignItems: 'center',
    flex: 1,
  },
  devPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#B388FF',
  },
  devText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Present;