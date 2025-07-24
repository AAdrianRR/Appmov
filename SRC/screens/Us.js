import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const cardShadow = {
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

const Us = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Caja Nuestro Propósito */}
      <View style={styles.cardPropósito}>
        <Text style={styles.title}>Nuestro Propósito</Text>
        <Text style={styles.description}>
          En este instituto del DIF, buscamos promover la diversión, la salud física y el bienestar emocional
          de todas las personas que nos visitan. Nos enfocamos especialmente en brindar actividades recreativas
          como la natación, para mejorar la calidad de vida de nuestros usuarios, sin importar su edad o condición.
        </Text>
      </View>

      {/* Imagen independiente */}
      <Image
        source={require('../../assets/n1.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Caja Nuestro Equipo */}
      <View style={styles.cardEquipo}>
        <Text style={styles.subtitle}>Nuestro Equipo</Text>
        <Text style={styles.description}>
          Contamos con un equipo de profesionales comprometidos, entre ellos instructores de natación certificados,
          terapeutas físicos, voluntarios y personal administrativo, todos enfocados en crear un ambiente seguro,
          amigable y estimulante.{"\n\n"}
          Lo que buscamos en nuestro equipo:
          {"\n"}• Pasión por ayudar a los demás.
          {"\n"}• Vocación de servicio.
          {"\n"}• Energía positiva y empatía.
          {"\n"}• Compromiso con el bienestar de la comunidad.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fcff',
    padding: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  cardPropósito: {
    backgroundColor: '#6e2166',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    ...cardShadow,
  },
  cardEquipo: {
    backgroundColor: '#f05598',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
    ...cardShadow,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    textAlign: 'justify',
  },
  image: {
    width: screenWidth * 0.9,
    height: 200,
    borderRadius: 15,
    marginBottom: 30,
  },
});

export default Us;
