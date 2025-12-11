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

export default function ClientesFormScreens({ navigation, route }) {
  const clienteEditar = route.params?.cliente ?? null;

  const [documentoCliente, setDocumento] = useState("");
  const [tipoDocumentoCliente, setTipoDocumento] = useState("");
  const [nombreCliente, setNombre] = useState("");
  const [apellidoCliente, setApellido] = useState("");
  const [correoCliente, setCorreo] = useState("");
  const [telefonoCliente, setTelefono] = useState("");

  const API_URL = "http://localhost:5059/api/clientes";

  useEffect(() => {
    if (clienteEditar) {
      setDocumento(clienteEditar.documentoCliente);
      setTipoDocumento(clienteEditar.tipoDocumentoCliente);
      setNombre(clienteEditar.nombreCliente);
      setApellido(clienteEditar.apellidoCliente);
      setCorreo(clienteEditar.correoCliente);
      setTelefono(clienteEditar.telefonoCliente);
    }
  }, []);

  const guardar = async () => {
    if (!documentoCliente || !nombreCliente) {
      return Alert.alert("Completa los campos obligatorios");
    }

    try {
      if (clienteEditar) {
        await axios.put(`${API_URL}/${documentoCliente}`, {
          documentoCliente,
          tipoDocumentoCliente,
          nombreCliente,
          apellidoCliente,
          correoCliente,
          telefonoCliente,
          
        });
        Alert.alert("Cliente actualizado");
      } else {
        await axios.post(API_URL, {
          documentoCliente,
          tipoDocumentoCliente,
          nombreCliente,
          apellidoCliente,
          correoCliente,
          telefonoCliente,
          pedidos: [],
        });
        Alert.alert("Cliente registrado");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el cliente");
      console.log(error.response?.data);;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

    
      <View style={styles.header}>
        <Ionicons name="business-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>
          {clienteEditar ? "Editar cliente" : "Agregar cliente"}
        </Text>
        <Ionicons name="business-outline" size={28} color="#fff" />
      </View>

  
      <Text style={styles.label}>Documento:</Text>
      <TextInput
        style={styles.input}
        value={documentoCliente}
        onChangeText={setDocumento}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo de Documento:</Text>
      <TextInput
        style={styles.input}
        value={tipoDocumentoCliente}
        onChangeText={setTipoDocumento}
      />

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombreCliente}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellidoCliente}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={correoCliente}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>Teléfono:</Text>
        <TextInput
        style={styles.input}
        value={telefonoCliente}
        keyboardType="phone-pad"
        placeholder="(+57) 1234567890"
        onChangeText={(text) => {
            if (!text.startsWith("(+57) ")) {
            text = "(+57) " + text.replace("(+57) ", "");
            }
            setTelefono(text);
        }}
        onFocus={() => {
            if (!telefonoCliente.startsWith("(+57) ")) {
            setTelefono("(+57) ");
            }
        }}
        />


      
      <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>

    
      <TouchableOpacity
        style={styles.btnVolver}
        onPress={() => navigation.navigate("Clientes")}
      >
        <Text style={styles.btnText}>Volver a la Lista</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },

  header: {
    backgroundColor: "#72CB10",
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
    backgroundColor: "#72CB10",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  btnVolver: {
    backgroundColor: "#72CB10",
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