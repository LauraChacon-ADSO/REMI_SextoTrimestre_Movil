import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../utils/api";

export default function EditarUsuarioScreen({ route, navigation }) {
  const { usuario } = route.params;

  const [nombre, setNombre] = useState(usuario.nombreUsuario);
  const [apellido, setApellido] = useState(usuario.apellidoUsuario);
  const [correo, setCorreo] = useState(usuario.correoUsuario);
  const [tipoDocumento, setTipoDocumento] = useState(usuario.tipoDocumentoUsuario);
  const [codigoNivel, setCodigoNivel] = useState(usuario.codigoNivel.toString());
  const [password, setPassword] = useState("");

  const actualizarUsuario = async () => {
    try {
      await api.put(`/auth/usuarios/${usuario.documentoUsuario}`, {
        NombreUsuario: nombre,
        ApellidoUsuario: apellido,
        CorreoUsuario: correo,
        TipoDocumentoUsuario: tipoDocumento,
        CodigoNivel: parseInt(codigoNivel, 10),
        Password: password.trim() !== "" ? password : null,
      });

      Alert.alert("Éxito", "Usuario actualizado correctamente");

      navigation.navigate("GestionUsuarios", {
        updatedUser: {
          documentoUsuario: usuario.documentoUsuario,
          nombreUsuario: nombre,
          apellidoUsuario: apellido,
          correoUsuario: correo,
          tipoDocumentoUsuario: tipoDocumento,
          codigoNivel: parseInt(codigoNivel, 10),
        },
      });
    } catch (error) {
      console.log("Error actualizando usuario:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo actualizar el usuario");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Editar Usuario</Text>

        <Ionicons name="create-outline" size={30} color="#fff" />
      </View>

      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
      <TextInput style={styles.input} value={apellido} onChangeText={setApellido} placeholder="Apellido" />
      <TextInput style={styles.input} value={correo} onChangeText={setCorreo} placeholder="Correo" />

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

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Nueva contraseña (opcional)"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={actualizarUsuario}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
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
    fontWeight: "bold",
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
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 6, color: "#333" },
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
  selectedCE: { backgroundColor: "#17a2b8" },
  selectedAdmin: { backgroundColor: "#72cb10" },
  selectedVendor: { backgroundColor: "#137aceff" },
  button: {
    backgroundColor: "#72cb10",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});