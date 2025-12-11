import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function ClientesScreens({ navigation }) {
  const [Clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:5059/api/clientes";

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setClientes(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchClientes();
    }, [])
  );

    const handleDelete = async (documento) => {

    console.log("Documento enviado al backend (bruto): >", documento, "<");

    const documentoLimpio = String(documento)
        .trim()
        .replace(/[^0-9]/g, "");

    console.log("Documento enviado al backend (limpio): >", documentoLimpio, "<");

    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
        await axios.delete(`http://localhost:5059/api/clientes/${documentoLimpio}`);
        alert("Cliente eliminado correctamente");
        fetchClientes();
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar este cliente.");
    }
    };

  const filtered = Clientes.filter((item) =>
    item.nombreCliente?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4ead00" />
        <Text>Cargando clientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Clientes</Text>

        <Ionicons name="people-outline" size={28} color="#fff" />
      </View>

     
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#2d7211" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente por nombre"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSearch("");
            fetchClientes();
          }}
        >
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

     
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.documentoCliente.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{`${item.nombreCliente} ${item.apellidoCliente}`}</Text>
              <Text style={styles.code}>Documento: {item.documentoCliente}</Text>
              <Text style={styles.code}>Correo: {item.correoCliente}</Text>
              <Text style={styles.code}>Teléfono: {item.telefonoCliente}</Text>
            </View>
            
            <TouchableOpacity
                style={{ padding: 10, marginLeft: 10 }}
                onPress={() => navigation.navigate("ClientesForm", { cliente: item })}
            >
                <Ionicons name="create-outline" size={24} color="#132692" />
            </TouchableOpacity>
           
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.documentoCliente)}
            >
              <Ionicons name="trash" size={24} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchClientes} />
        }
      />

   
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("ClientesForm")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#72CB10",
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },

  headerTitle: {
    color: "#132692",
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },

 
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#72CB10",
    borderWidth: 1.5,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: "#72CB10",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  clearButtonText: {
     color: "#132692ff",
    fontWeight: "bold",
    fontSize: 16,
  },

 
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 18, fontWeight: "700" },
  code: { fontSize: 14, color: "#666" },

  deleteButton: {
    padding: 10,
    marginLeft: 10,
  },


  addButton: {
    backgroundColor: "#72CB10",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  
});