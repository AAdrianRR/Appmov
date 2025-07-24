import { StyleSheet } from 'react-native';

export const cardShadow = {
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#f0fcff',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
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
    marginBottom: 20,
    ...cardShadow,
  },
  card3: {
    backgroundColor: '#f05598',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...cardShadow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: '#ffffff',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoBox: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
  },
  scheduleText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default styles;
