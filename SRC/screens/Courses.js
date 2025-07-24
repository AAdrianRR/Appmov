import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Courses = () => {
  const openOfficialSite = () => {
    Linking.openURL('https://www.difdurango.gob.mx/');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Caja de beneficios */}
      <View style={styles.card1}>
        <Text style={styles.title}>Beneficios del DIF</Text>
        <Text style={styles.description}>
          El DIF ofrece apoyo a personas en situación vulnerable, asesoría psicológica, servicios médicos, alimentación, programas educativos, recreativos y más.
          Sus esfuerzos están dirigidos a mejorar la calidad de vida de niños, adultos mayores, personas con discapacidad y familias en general.
        </Text>
      </View>

      {/* Caja de cursos */}
      <View style={styles.card2}>
        <Text style={styles.title}>Cursos que ofrece el DIF</Text>
        <Text style={styles.description}>
          • Natación terapéutica y recreativa{"\n"}
          • Manualidades y arte{"\n"}
          • Cocina y repostería{"\n"}
          • Talleres para adultos mayores{"\n"}
          • Desarrollo infantil temprano{"\n"}
          • Actividades físicas para la salud{"\n"}
          • Alfabetización y apoyo escolar
        </Text>
      </View>

      {/* Imagen fuera de las cajas */}
      <Image
        source={{ uri: 'https://juarez.gob.mx/docs/66393d390d5ea__66393d390d5ec.jpeg' }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Caja de invitación */}
      <View style={styles.card3}>
        <Text style={styles.title}>Conoce más sobre el DIF y lo que te puede ofrecer</Text>
        <TouchableOpacity style={styles.button} onPress={openOfficialSite}>
          <Text style={styles.buttonText}>Ir a la página oficial del DIF</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const cardShadow = {
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#f0fcff',
  },
  card1: {
    backgroundColor: '#28c3cd',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  card2: {
    backgroundColor: '#6e2166',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  card3: {
    backgroundColor: '#f6a729',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    ...cardShadow,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    textAlign: 'justify',
  },
  image: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 20,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#6e2166',
    fontWeight: 'bold',
  },
});

export default Courses;
