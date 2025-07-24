import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  saludo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f3460',
    marginBottom: 20,
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginTop: 10
  },
  boton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#0f3460'
  },
  botonTexto: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 16
  },
  logout: {
    marginTop: 20,
    padding: 10
  },
  logoutTexto: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14
  }
});
