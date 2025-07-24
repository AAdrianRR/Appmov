import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { API_BASE } from "../constants/config";
import { UserContext } from "../contexts/UserContext";

const HorarioDigitalAlumno = () => {
  const { userData } = useContext(UserContext);
  const token = userData.token;
  const viewRef = useRef();

  const [clase, setClase] = useState(null);

  useEffect(() => {
    const cargarClase = async () => {
      try {
        const res = await axios.get(`${API_BASE}/alumno/panel`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClase(res.data);
      } catch (err) {
        console.log("❌ Error al cargar clase:", err.message);
      }
    };

    if (token) cargarClase();
  }, [token]);

  const capturarHorario = async () => {
    try {
      const uri = await viewRef.current.capture();
      const nombreArchivo = `Horario_${userData.nombre}.png`;
      const destino = FileSystem.documentDirectory + nombreArchivo;

      await FileSystem.copyAsync({ from: uri, to: destino });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(destino);
      } else {
        Alert.alert("Horario capturado", `Guardado en: ${destino}`);
      }
    } catch (error) {
      console.error("❌ Error al capturar horario:", error.message);
      Alert.alert("Error", "No se pudo guardar el horario.");
    }
  };

  if (!clase) return null;

  return (
    <View style={{ padding: 20 }}>
      <ViewShot ref={viewRef} options={{ format: "png", quality: 0.9 }}>
        <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            📘 Clase Asignada
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Alumno:</Text> {userData.nombre}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Clase:</Text> {clase.clase}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Horario:</Text> {clase.horario}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Profesor:</Text> {clase.profesor}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Días:</Text>{" "}
            {Array.isArray(clase.dias) ? clase.dias.join(", ") : "No asignados"}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Inicio:</Text> 10 de julio de 2025
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Fin:</Text> 20 de agosto de 2025
          </Text>
          {clase.mensaje && (
            <Text style={{ fontStyle: "italic", marginTop: 8 }}>
              📢 {clase.mensaje}
            </Text>
          )}
        </View>
      </ViewShot>

      <TouchableOpacity
        style={{
          backgroundColor: "#6e2166",
          padding: 12,
          marginTop: 20,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={capturarHorario}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Descargar horario como imagen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HorarioDigitalAlumno;
