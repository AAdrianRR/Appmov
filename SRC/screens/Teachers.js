import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { API_BASE } from "../constants/config";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/teachersStyles"; // ✅ Importando estilos modularizados

const Teachers = () => {
  const { userData } = useContext(UserContext);
  const token = userData.token;
  const nombre = userData.nombre;

  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [expandidas, setExpandidas] = useState({});

  useEffect(() => {
    if (!token) return;

    const cargarDatos = async () => {
      try {
        const res = await axios.get(`${API_BASE}/profesor/mis-clases`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClases(res.data.clases || res.data || []);
        setError(false);
      } catch (err) {
        console.log("❌ Error al cargar clases:", err.message);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandidas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const claseMasProxima = clases
    .filter((c) => new Date(c.fechaInicio) >= new Date())
    .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))[0];

  const fechaProxima = claseMasProxima
    ? new Date(claseMasProxima.fechaInicio).toLocaleDateString('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : null;

  const renderClasesExpandibles = () => {
    return clases.map((clase) => (
      <TouchableOpacity
        key={clase._id}
        onPress={() => toggleExpand(clase._id)}
        style={styles.card3}
        activeOpacity={0.8}
      >
        <Text style={styles.sectionTitle}>{clase.nombre}</Text>
        <Text style={styles.scheduleText}>Hora: {clase.hora}</Text>
        <Text style={styles.scheduleText}>Días: {clase.dias.join(', ')}</Text>

        {expandidas[clase._id] && (
          <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: '#fff', paddingTop: 10 }}>
            <Text style={styles.scheduleText}>
              Maestro: {clase.maestro.nombre} {clase.maestro.apellido}
            </Text>
            <Text style={styles.scheduleText}>
              Inicio: {new Date(clase.fechaInicio).toLocaleDateString()}
            </Text>
            <Text style={styles.scheduleText}>
              Fin: {new Date(clase.fechaFin).toLocaleDateString()}
            </Text>
            <Text style={[styles.scheduleText, { marginTop: 10 }]}>
              Alumnos:
            </Text>
            {clase.alumnos.map((alumno, idx) => (
              <Text key={idx} style={styles.scheduleText}>
                • {alumno.nombre} {alumno.apellido}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  if (!token) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          🔒 Sesión no iniciada. Regresa al login para continuar.
        </Text>
      </View>
    );
  }

  if (cargando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text>Cargando tus clases...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>No se pudieron cargar tus clases.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card1}>
        <Text style={styles.title}>Bienvenido: {nombre}</Text>
        <View style={styles.row}>
          <Image
            source={{
              uri: "https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1410/wavebreakmediamicro141002729/32130346-handsome-swimming-instructor-smiling-at-camera-at-the-leisure-center.jpg",
            }}
            style={styles.photo}
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Nombre: {nombre}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card2}>
        <Text style={styles.sectionTitle}>Tu próxima clase</Text>
        {claseMasProxima ? (
          <Text style={styles.subText}>
            {fechaProxima} a las {claseMasProxima.hora}
          </Text>
        ) : (
          <Text style={styles.subText}>No tienes clases próximas registradas</Text>
        )}
      </View>

      <View>{renderClasesExpandibles()}</View>
    </ScrollView>
  );
};

export default Teachers;
