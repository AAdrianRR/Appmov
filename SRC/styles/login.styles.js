import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
    resizeMode: 'contain'
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f3460'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0f3460'
  },
  icon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    color: '#000000',
    height: 50
  },
  loginButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0f3460'
  },
  loginButtonText: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  }
});
