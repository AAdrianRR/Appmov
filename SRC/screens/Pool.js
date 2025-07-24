import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const images = [
  require('../../assets/a1.jpg'),
  require('../../assets/a2.jpg'),
  require('../../assets/a3.jpg'),
  require('../../assets/a4.jpg'),
];

const Pool = () => {
  const openMap = () => {
    const url =
      'https://www.google.com/maps/place/Centro+de+Desarrollo+Oriente/@24.0627559,-104.5992367,17z';
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Caja de información */}
      <View style={styles.card1}>
        <Text style={styles.sectionTitle}>Información sobre la alberca</Text>
        <Text style={styles.text}>
          Nuestra alberca es un espacio diseñado para que niños, adolescentes y adultos puedan aprender a nadar,
          relajarse y socializar. Contamos con instalaciones modernas, instructores certificados y un ambiente
          seguro y divertido para todos.
        </Text>
      </View>

      {/* Carrusel de imágenes (fuera de la caja) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} />
        ))}
      </ScrollView>

      {/* Caja de dirección */}
      <View style={styles.card2}>
        <Text style={styles.sectionTitle}>¿Dónde nos ubicamos?</Text>
        <Text style={styles.text}>
          Nos encontramos en: Av del Hierro, Cd Industrial, 34229 Durango, Dgo.
        </Text>
      </View>

      {/* Mapa como imagen interactiva (fuera de la caja) */}
      <TouchableOpacity onPress={openMap} style={styles.mapContainer}>
        <Image
          source={require('../../assets/mapa.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <Text style={styles.mapText}>Abrir en Google Maps</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const cardShadow = {
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fcff',
    padding: 20,
    paddingTop: 100,
  },
  card1: {
    backgroundColor: '#6e2166',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  card2: {
    backgroundColor: '#f6a729',
    borderRadius: 15,
    padding: 20,
    marginTop: 25,
    marginBottom: 20,
    ...cardShadow,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  carousel: {
    marginBottom: 25,
  },
  image: {
    width: screenWidth * 0.8,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
  },
  mapContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#eaeaea',
    marginBottom: 30,
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
  mapText: {
    padding: 10,
    textAlign: 'center',
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Pool;
