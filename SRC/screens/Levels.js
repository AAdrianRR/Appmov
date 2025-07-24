import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Levels = () => {
  const [temperaturaExterior, setTemperaturaExterior] = useState('');
  const [loading, setLoading] = useState(true);
  const [clima, setClima] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoDetalle, setTipoDetalle] = useState('');

  const temperaturaInterior = '29°C';
  const temperaturaAgua = '27.5°C';
  const nivelAgua = '75%';

  const obtenerClima = async () => {
    try {
      const apiKey = 'f8ef2bfb4becf34de771c029b6fb88ee';
      const ciudad = 'Durango,mx';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

      const respuesta = await axios.get(url);
      const temp = respuesta.data.main.temp;
      const weather = respuesta.data.weather[0].main;
      setTemperaturaExterior(`${temp}°C`);
      setClima(weather);
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      setTemperaturaExterior('N/A');
    } finally {
      setLoading(false);
    }
  };

  const getClimaColor = () => {
    switch (clima) {
      case 'Clear': return '#fcd500';
      case 'Clouds': return '#a3a3a3';
      case 'Rain': return '#3b5998';
      default: return '#f6a729';
    }
  };

  const abrirDetalle = (tipo) => {
    setTipoDetalle(tipo);
    setModalVisible(true);
  };

  useEffect(() => {
    obtenerClima();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, { backgroundColor: getClimaColor() }]}>
        <Text style={styles.cardTitle}>Clima Exterior (Durango)</Text>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <>
            <Text style={styles.cardValue}>{temperaturaExterior}</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.google.com/search?q=clima+durango')
              }
            >
              <Text style={styles.linkText}>Más sobre el clima</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity onPress={() => abrirDetalle('Temperatura Interior')}>
        <View style={[styles.card, styles.cardInterior]}>
          <Text style={styles.cardTitle}>Temperatura Interior</Text>
          <Text style={styles.cardValue}>{temperaturaInterior}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => abrirDetalle('Nivel de Agua')}>
        <View style={[styles.card, styles.cardNivel]}>
          <Text style={styles.cardTitle}>Nivel de Agua</Text>
          <Text style={styles.cardValue}>{nivelAgua}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => abrirDetalle('Temperatura del Agua')}>
        <View style={[styles.card, styles.cardAgua]}>
          <Text style={styles.cardTitle}>Temperatura del Agua</Text>
          <Text style={styles.cardValue}>{temperaturaAgua}</Text>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>{tipoDetalle}</Text>

            <LineChart
              data={{
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{ data: [28, 29, 30, 28, 27, 29, 30] }],
              }}
              width={Dimensions.get('window').width - 80}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              style={{ borderRadius: 10 }}
            />

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, color: 'white', textAlign: 'center' }}>
              Lectura de 21 de julio
            </Text>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  padding: 8,
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 14 }}>Temperatura del Agua: 27.5°C</Text>
                <Text style={{ fontSize: 14 }}>Clima Interior: 30.0°C</Text>
                <Text style={{ fontSize: 14 }}>Nivel del Agua: 75%</Text>
                <Text style={{ fontSize: 14 }}>Clima Exterior: Soleado</Text>
              </View>
            </View>

            <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fcff',
    padding: 20,
    paddingTop: 100,
  },
  card: {
    width: '100%',
    padding: 25,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  cardInterior: {
    backgroundColor: '#28c3cd',
  },
  cardNivel: {
    backgroundColor: '#6e2166',
  },
  cardAgua: {
    backgroundColor: '#f05598',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#0bb1e4ff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '85%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Levels;
