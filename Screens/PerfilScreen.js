import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await AsyncStorage.getItem("usuario");
        if (data) setUsuario(JSON.parse(data));
      } catch (e) {
        console.log("Error cargando usuario:", e);
      }
    };
    cargarUsuario();
  }, []);

  const handleBack = () => {
    if (usuario?.rol === "admin") {
      navigation.replace("AdminHome");
    } else {
      navigation.replace("VendedorHome");
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back-circle" size={32} color="#4ead00" />
      </TouchableOpacity>

      {/* Ícono de perfil */}
      <Ionicons name="person-circle-outline" size={100} color="#004AAD" />

      <Text style={styles.header}>Perfil de Usuario</Text>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={22} color="#004AAD" />
          <Text style={styles.label}>Nombre</Text>
        </View>
        <Text style={styles.value}>{usuario.nombre}</Text>
        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Ionicons name="id-card-outline" size={22} color="#004AAD" />
          <Text style={styles.label}>Documento</Text>
        </View>
        <Text style={styles.value}>{usuario.documento}</Text>
        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#004AAD" />
          <Text style={styles.label}>Rol</Text>
        </View>
        <Text style={[styles.value, usuario.rol === "admin" ? styles.admin : styles.vendedor]}>
          {usuario.rol === "admin" ? "Administrador" : "Vendedor"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004AAD",
    marginVertical: 15,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
    width: "100%",
  },
  admin: {
    color: "#097af3ff",
  },
  vendedor: {
    color: "#80cc54ff",
  },
  loading: {
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});