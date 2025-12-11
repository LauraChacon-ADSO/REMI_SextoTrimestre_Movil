import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../utils/api";
import { useFonts } from "expo-font";

export default function RegistrarUsuario({ navigation }) {
  const [loaded] = useFonts({
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    MerriweatherBold: require("../assets/fonts/Merriweather_24pt-Bold.ttf"),
    Geom: require("../assets/fonts/Geom-Regular.ttf"),
    GeomBold: require("../assets/fonts/Geom-Bold.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("CC");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [codigoNivel, setCodigoNivel] = useState("2"); // 1 = Admin, 2 = Vendedor

  const registrar = async () => {
    if (!nombre || !apellido || !documento || !correo || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await api.post("/Auth/register", {
        documento,
        tipoDocumento,
        nombre,
        apellido,
        correo,
        password,
        codigoNivel: parseInt(codigoNivel, 10),
      });
      Alert.alert("Éxito", "Usuario registrado correctamente");

      navigation.navigate("GestionUsuarios", {
        newUser: {
          documentoUsuario: documento,
          nombreUsuario: nombre,
          apellidoUsuario: apellido,
          correoUsuario: correo,
          tipoDocumentoUsuario: tipoDocumento,
          codigoNivel: parseInt(codigoNivel, 10),
        },
      });
    } catch (error) {
      console.log("Error registrando usuario:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "No se pudo registrar el usuario");
    }
  };

  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 16 }}>Cargando fuente...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Registrar Usuario</Text>

        <Ionicons name="person-add-outline" size={30} color="#fff" />
      </View>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={styles.input} placeholder="Documento" value={documento} onChangeText={setDocumento} />

      {/* Tipo de documento */}
      <Text style={styles.label}>Tipo de documento</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.optionButton, tipoDocumento === "CC" && styles.selectedCC]}
          onPress={() => setTipoDocumento("CC")}
        >
          <Ionicons name="card-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>CC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, tipoDocumento === "CE" && styles.selectedCE]}
          onPress={() => setTipoDocumento("CE")}
        >
          <Ionicons name="earth-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>CE</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Rol */}
      <Text style={styles.label}>Rol</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.optionButton, codigoNivel === "1" && styles.selectedAdmin]}
          onPress={() => setCodigoNivel("1")}
        >
          <Ionicons name="shield-checkmark-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>Administrador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, codigoNivel === "2" && styles.selectedVendor]}
          onPress={() => setCodigoNivel("2")}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>Vendedor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={registrar}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f4f8" },
  headerBox: {
    backgroundColor: "#72cb10",
    paddingVertical: 40,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  headerText: {
    color: "#132692ff",
    fontSize: 22,
    fontFamily: "GeomBold",
    textAlign: "center",
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 10,
    color: "#333",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  optionText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },
  selectedCC: { backgroundColor: "#004AAD" },
  selectedCE: { backgroundColor: "#56ce3eff" },
  selectedAdmin: { backgroundColor: "#72cb10" },
  selectedVendor: { backgroundColor: "#108ec0ff" },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#72cb10",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,
  },
  saveText: {
    color: "#132692",
    fontFamily: "GeomBold",
    fontSize: 16,
  },
});