import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  {
    id: "1",
    title: "Alberca",
    imageUrl:
      "https://www.eldiariodechihuahua.mx/core/dch/assets/images/2023/03/18/20230318094127333-0-2036144-rOlQZKFVu.jpg",
    screen: "Pool",
  },
  {
    id: "2",
    title: "Nosotros",
    imageUrl:
      "https://laotraplana.mx/wp-content/uploads/2024/07/Desde-hace-20-anos-a-Casa-Hogar-DIF-no-se-le-metia-mano_-mamas-cuidadoras-agradecen-remodelacion-y-equipamiento-del-lugar-1-1-scaled.jpeg",
    screen: "Us",
  },
  {
    id: "3",
    title: "Conócenos",
    imageUrl:
      "https://www.excelsior.com.mx/770x530/filters:format(webp):quality(75)/media/pictures/2025/03/26/3280863.jpg",
    screen: "KnowUs",
  },
  {
    id: "4",
    title: "Cursos",
    imageUrl:
      "https://juarez.gob.mx/docs/66393d390d5ea__66393d390d5ec.jpeg",
    screen: "Courses",
  },
];

const carouselImages = [
  "https://celayasidec.gob.mx/wp-content/uploads/2025/05/9d2e0498-fcb7-48fc-8db7-6180915722c9-1080x675.jpg", // Alberca DIF Coahuila
  "https://www.noticierosgrem.com.mx/wp-content/uploads/2023/06/alberca-municipal-de-lerdo.jpg",  // Actividad acuática DIF BCS
  "https://caborcasonora.gob.mx/wp-content/uploads/2016/07/13590461_1954430647920885_4827384960453880409_n.jpg" // Alberca DIF Jalisco
];


const Home = () => {
  const navigation = useNavigation();
  const [currentImage, setCurrentImage] = useState(0);

  const goToNextImage = () => {
    if (currentImage < carouselImages.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      setCurrentImage(0);
    }
  };
  const goToPrevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else {
      setCurrentImage(carouselImages.length - 1);
    }
  };

  const handleCategoryPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          ¡Bienvenido! Exploremos nuestros cursos de natación:
        </Text>
        <Text style={styles.welcomeSubText}>
          En el DIF nos gusta que estés feliz, por ello tenemos estas actividades para ti:
        </Text>
      </View>

      <Text style={styles.sectionTitle}>¡Explora nuestros cursos!</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item.screen)}>
            <View style={styles.categoryItem}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      <Text style={styles.sectionTitle}>Mira nuestra alberca:</Text>
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={goToPrevImage} style={styles.carouselButtonLeft}>
          <Text style={styles.carouselButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: carouselImages[currentImage] }}
          style={styles.carouselImages}
        />
        <TouchableOpacity onPress={goToNextImage} style={styles.carouselButtonRight}>
          <Text style={styles.carouselButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fcff',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#f05598',
    fontSize: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryImage: {
    width: 110,
    height: 110,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#656568",
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 30,
  },
  carouselImages: {
    width: 300,
    height: 150,
    borderRadius: 15,
  },
  carouselButtonLeft: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{ translateY: -20 }],
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  carouselButtonRight: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -20 }],
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  carouselButtonText: {
    color: "white",
    fontSize: 18,
  },
  welcomeContainer: {
    backgroundColor: "#f05598",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  welcomeSubText: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
});

export default Home;
