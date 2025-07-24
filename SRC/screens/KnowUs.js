import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const KnowUs = () => {
  const images = [
    require('../../assets/co1.webp'),
    require('../../assets/co2.webp'),
    require('../../assets/co3.jpg'),
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Caja Conócenos */}
      <View style={styles.card1}>
        <Text style={styles.title}>Conócenos</Text>
        <Text style={styles.description}>
          El DIF en Durango tiene como propósito mejorar la calidad de vida de la comunidad a través de programas como la natación terapéutica, recreativa y formativa.
          Nuestro enfoque está en el bienestar, la inclusión y la salud de cada persona que nos visita.
        </Text>
      </View>

      {/* Caja Nuestras Instalaciones */}
      <View style={styles.card2}>
        <Text style={styles.carouselTitle}>Nuestras Instalaciones</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </ScrollView>

        <Text style={[styles.description, { marginTop: 15 }]}>
          En nuestras instalaciones del DIF Durango fomentamos un entorno seguro y saludable para todos. Nuestro equipo está comprometido con el servicio, la atención
          humana y el trabajo coordinado para que cada visitante se sienta parte de esta gran familia.
        </Text>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const cardShadow = {
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fcff',
    padding: 20,
    paddingTop: 100,
  },
  card1: {
    backgroundColor: '#28c3cd',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    ...cardShadow,
  },
  card2: {
    backgroundColor: '#f05598',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    ...cardShadow,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
  },
  carousel: {
    // Puedes agregar margen si quieres
  },
  image: {
    width: width - 80,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
  },
});

export default KnowUs;
