import axios from "axios";
import * as Sharing from "expo-sharing";
import { useContext, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

import { API_BASE } from "../constants/config";
import { UserContext } from "../contexts/UserContext";

const ExportarHorarioAlumno = () => {
  const { userData } = useContext(UserContext);
  const token = userData.token;
  const nombre = userData.nombre;

  const [info, setInfo] = useState(null);

  useEffect(() => {
    const obtenerClase = async () => {
      try {
        const res = await axios.get(`${API_BASE}/alumno/panel`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInfo(res.data);
      } catch (error) {
        console.log("❌ Error al obtener clase:", error.message);
        Alert.alert("Error", "No se pudo cargar la clase.");
      }
    };

    if (token) obtenerClase();
  }, [token]);

  const generarPDF = async () => {
    if (!info) return;

    const html = `
      <h1 style="text-align: center;">Clase Asignada</h1>
      <p><strong>Alumno:</strong> ${nombre}</p>
      <p><strong>Clase:</strong> ${info.clase}</p>
      <p><strong>Horario:</strong> ${info.horario}</p>
      <p><strong>Profesor:</strong> ${info.profesor}</p>
      <p><strong>Próxima sesión:</strong> ${info.siguienteSesion}</p>
      ${info.mensaje ? `<p><strong>Mensaje:</strong> ${info.mensaje}</p>` : ""}
    `;

    try {
      const options = {
        html,
        fileName: `Clase_${nombre}`,
        directory: "Documents",
      };

      const file = await RNHTMLtoPDF.convert(options);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.filePath);
      } else {
        Alert.alert("PDF generado", `Se guardó en: ${file.filePath}`);
      }
    } catch (error) {
      console.error("❌ Error al generar PDF:", error.message);
      Alert.alert("Error", "No se pudo generar el PDF.");
    }
  };

  if (!token || !info) return null;
//JSX
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#6e2166",
          padding: 15,
          borderRadius: 10,
          alignItems: "center"
        }}
        onPress={generarPDF}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Exportar horario en PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
};
//componente
export default ExportarHorarioAlumno;
