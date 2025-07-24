import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import HorarioDigitalAlumno from "../components/HorarioDigitalAlumno"; // ✅ Componente de captura
import { API_BASE } from "../constants/config";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/studentPanelStyles";

const Students = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const token = userData.token;

  const [infoClase, setInfoClase] = useState(null);
  const [errorClase, setErrorClase] = useState(false);
  const [cargandoClase, setCargandoClase] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null); // ✅ corregido
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const cargarClase = async () => {
      try {
        const res = await axios.get(`${API_BASE}/alumno/panel`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfoClase(res.data);
        setErrorClase(false);
      } catch (err) {
        console.log("❌ Error al obtener clase del alumno:", err.message);
        setErrorClase(true);
      } finally {
        setCargandoClase(false);
      }
    };

    if (token) cargarClase();
  }, [token]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setDeleted(false);
      setModalVisible(false);
    }
  };

  const deleteImage = () => {
    setDeleted(true);
    setImageUri(null); // ✅ limpiamos imagen
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Caja bienvenida */}
      <View style={[styles.card1, deleted && { backgroundColor: "#ccc" }]}>
        <Text style={styles.title}>Bienvenida, {userData.nombre}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.row}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.photo} />
            ) : (
              <View style={[styles.photo, { backgroundColor: "#ccc" }]} />
            )}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Nombre: {userData.nombre}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal editar imagen */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
              />
            ) : (
              <View
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: "#ccc",
                  borderRadius: 10,
                }}
              />
            )}
            <Pressable style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Editar</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={deleteImage}>
              <Text style={styles.modalButtonText}>Eliminar</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, color: "#007bff" }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Clase asignada */}
      <View style={styles.card2}>
        <Text style={styles.sectionTitle}>Prepárate para tu próxima clase:</Text>
        {cargandoClase ? (
          <Text style={styles.subText}>Cargando datos...</Text>
        ) : errorClase ? (
          <Text style={styles.subText}>No tienes clase asignada actualmente.</Text>
        ) : (
          <>
            <Text style={styles.subText}>
              Clase: {infoClase.clase} con {infoClase.profesor}
            </Text>
            <Text style={styles.subText}>Horario: {infoClase.horario}</Text>
            <Text style={styles.subText}>
              Próxima sesión: {infoClase.siguienteSesion}
            </Text>
            {infoClase.mensaje && (
              <Text style={styles.subText}>📢 {infoClase.mensaje}</Text>
            )}
          </>
        )}
      </View>

      {/* Horario digital capturable */}
      <View style={styles.card3}>
        <Text style={styles.sectionTitle}>Horario institucional</Text>
        <Text style={styles.subText}>Descargar tu horario:</Text>
        <HorarioDigitalAlumno />
      </View>

      {/* Normas institucionales */}
      <View style={styles.card3}>
        <Text style={styles.sectionTitle}>Normas generales de la piscina</Text>
        <Text style={styles.subText}>Por tu seguridad y la de todos:</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.subText}>1️⃣ Ducharse antes de ingresar al agua.</Text>
          <Text style={styles.subText}>2️⃣ No correr alrededor de la piscina.</Text>
          <Text style={styles.subText}>3️⃣ Prohibido ingresar con ropa de calle.</Text>
          <Text style={styles.subText}>4️⃣ No empujar a otros dentro del agua.</Text>
          <Text style={styles.subText}>5️⃣ No se permite comer en el área acuática.</Text>
          <Text style={styles.subText}>6️⃣ Obedece al maestro en todo momento.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Students;
