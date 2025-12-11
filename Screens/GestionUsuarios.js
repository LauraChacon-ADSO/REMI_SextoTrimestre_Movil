import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../utils/api";
import PropTypes from "prop-types";
import { useFonts } from "expo-font";

export default function GestionUsuarios({ navigation, route }) {
  const [loaded] = useFonts({
      Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
      MerriweatherBold: require("../assets/fonts/Merriweather_24pt-Bold.ttf"),
      Geom: require("../assets/fonts/Geom-Regular.ttf"),
      GeomBold: require("../assets/fonts/Geom-Bold.ttf"),
      Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
      MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    });

  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState(""); // estado para buscar

  const cargarUsuarios = async () => {
    try {
      const response = await api.get("/auth/usuarios");
      console.log("Usuarios recibidos:", response.data);
      setUsuarios(response.data);
    } catch (error) {
      console.log("Error cargando usuarios:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo cargar la lista de usuarios");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (route.params?.updatedUser) {
      const updatedUser = route.params.updatedUser;
      setUsuarios((prev) =>
        prev.map((u) =>
          u.documentoUsuario === updatedUser.documentoUsuario ? updatedUser : u
        )
      );
      navigation.setParams({ updatedUser: null });
    }
  }, [route.params?.updatedUser]);

  const eliminarUsuario = async (documento) => {
    try {
      await api.delete(`/auth/usuarios/${documento}`);
      Alert.alert("Éxito", "Usuario eliminado correctamente");
      cargarUsuarios();
    } catch (error) {
      console.log("Error eliminando usuario:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo eliminar el usuario");
    }
  };

  const confirmarEliminarUsuario = (usuario) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Deseas eliminar a ${usuario.nombreUsuario} ${usuario.apellidoUsuario}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarUsuario(usuario.documentoUsuario),
        },
      ]
    );
  };

  // Filtro para la busqueda de usuarios
  const filteredUsuarios = usuarios.filter((u) =>
    `${u.nombreUsuario} ${u.apellidoUsuario}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!loaded) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={{ fontSize: 16 }}>Cargando fuente...</Text>
        </View>
      );
    }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>
        {item.nombreUsuario} {item.apellidoUsuario}
      </Text>

      <View style={styles.infoRow}>
        <Ionicons name="id-card-outline" size={18} color="#004AAD" style={styles.icon} />
        <Text style={styles.info}>Documento: {item.documentoUsuario}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={18} color="#004AAD" style={styles.icon} />
        <Text style={styles.info}>Correo: {item.correoUsuario}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons
          name={item.codigoNivel === 1 ? "shield-checkmark-outline" : "cart-outline"}
          size={18}
          color={item.codigoNivel === 1 ? "#28a745" : "#ffc107"}
          style={styles.icon}
        />
        <Text style={styles.info}>
          {item.codigoNivel === 1 ? "Administrador" : "Vendedor"}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("EditarUsuario", { usuario: item })}
        >
          <Ionicons name="create-outline" size={24} color="#1463a3ff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => confirmarEliminarUsuario(item)}
        >
          <Ionicons name="trash-outline" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <View style={styles.headerBox}>
        <TouchableOpacity >
          <Ionicons name="people-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Gestión de Usuarios</Text>

        <Ionicons name="people-outline" size={30} color="#fff" />
      </View>

      {/* Barra para buscador */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={22} color="#004AAD" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuario por nombre"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={22} color="#dc3545" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.rowColumn}>
        <Text style={styles.count}>Total usuarios: {filteredUsuarios.length}</Text>
      </View>

      <FlatList
        data={filteredUsuarios}
        keyExtractor={(item) => item.documentoUsuario}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay usuarios registrados
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={true}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("RegistrarUsuario")}
      >
        <Ionicons name="add-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

GestionUsuarios.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: "#fff" },
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
    fontSize: 24,
    fontFamily: "GeomBold",
    textAlign: "center",
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#72cb10",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  rowColumn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  count: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f0f4f8",
    padding: 18,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  icon: { marginRight: 6 },
  info: { fontSize: 14, color: "#555" },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
    gap: 15,
  },
  iconButton: { padding: 6 },
  separator: { height: 12 },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#72cb10",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});