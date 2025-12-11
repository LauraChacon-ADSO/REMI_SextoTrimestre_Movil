import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function ProveedorFormScreens({ navigation, route }) {
  const proveedorEditar = route.params?.proveedor ?? null;

  const [documentoProveedor, setDocumento] = useState("");
  const [tipoDocumentoProveedor, setTipoDocumento] = useState("");
  const [nombreProveedor, setNombre] = useState("");
  const [correoProveedor, setCorreo] = useState("");
  const [telefonoProveedor, setTelefono] = useState("");

  const API_URL = "http://10.0.2.2:5073/api/proveedores";

  useEffect(() => {
    if (proveedorEditar) {
      setDocumento(proveedorEditar.documentoProveedor);
      setTipoDocumento(proveedorEditar.tipoDocumentoProveedor);
      setNombre(proveedorEditar.nombreProveedor);
      setCorreo(proveedorEditar.correoProveedor);
      setTelefono(proveedorEditar.telefonoProveedor);
    }
  }, []);

  const guardar = async () => {
    if (!documentoProveedor || !nombreProveedor) {
      return Alert.alert("Completa los campos obligatorios");
    }

    try {
      if (proveedorEditar) {
        await axios.put(`${API_URL}/${documentoProveedor}`, {
          documentoProveedor,
          tipoDocumentoProveedor,
          nombreProveedor,
          correoProveedor,
          telefonoProveedor,
        });
        Alert.alert("Proveedor actualizado");
      } else {
        await axios.post(API_URL, {
          documentoProveedor,
          tipoDocumentoProveedor,
          nombreProveedor,
          correoProveedor,
          telefonoProveedor,
        });
        Alert.alert("Proveedor registrado");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el proveedor");
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

    
      <View style={styles.header}>
        <Ionicons name="business-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>
          {proveedorEditar ? "Editar Proveedor" : "Agregar Proveedor"}
        </Text>
        <Ionicons name="business-outline" size={28} color="#fff" />
      </View>

  
      <Text style={styles.label}>Documento:</Text>
      <TextInput
        style={styles.input}
        value={documentoProveedor}
        onChangeText={setDocumento}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo de Documento:</Text>
      <TextInput
        style={styles.input}
        value={tipoDocumentoProveedor}
        onChangeText={setTipoDocumento}
      />

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombreProveedor}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={correoProveedor}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={telefonoProveedor}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      
      <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>

    
      <TouchableOpacity
        style={styles.btnVolver}
        onPress={() => navigation.navigate("Proveedores")}
      >
        <Text style={styles.btnText}>Volver a la Lista</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },

  header: {
    backgroundColor: "#72cb10",
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#132692",
  },

  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },

  btnGuardar: {
    backgroundColor: "#72cb10",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  btnVolver: {
    backgroundColor: "#72cb10",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },

  btnText: {
    color: "#132692",
    fontSize: 18,
    fontWeight: "600",
  },
});