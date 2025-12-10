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

export default function ProveedorScreens({ navigation }) {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const API_URL = "http://10.0.2.2:5073/api/proveedores";

  const fetchProveedores = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProveedores(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProveedores();
    }, [])
  );

  const handleDelete = async (documento) => {
    Alert.alert(
      "Eliminar proveedor",
      "¿Seguro que deseas eliminar este proveedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await axios.delete(`${API_URL}/${documento}`);
            fetchProveedores();
          },
        },
      ]
    );
  };

  const filtered = proveedores.filter((item) =>
    item.nombreProveedor?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4ead00" />
        <Text>Cargando proveedores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
     
      <View style={styles.header}>
        <Ionicons name="business-outline" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Proveedores</Text>
        <Ionicons name="business-outline" size={28} color="#fff" />
      </View>

     
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#2d7211" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar proveedor por nombre"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSearch("");
            fetchProveedores();
          }}
        >
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

     
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.documentoProveedor.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.nombreProveedor}</Text>
              <Text style={styles.code}>Documento: {item.documentoProveedor}</Text>
              <Text style={styles.code}>Correo: {item.correoProveedor}</Text>
            </View>

           <TouchableOpacity
                style={{ padding: 10, marginLeft: 10 }}
                onPress={() => navigation.navigate("ProveedorForm", { cliente: item })}
            >
                <Ionicons name="create-outline" size={24} color="#132692" />
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.documentoProveedor)}
            >
              <Ionicons name="trash" size={24} color="#d9534f" />
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchProveedores} />
        }
      />

   
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("ProveedorForm")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#4ead00",
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
    borderColor: "#2d7211",
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
    backgroundColor: "#4ead00",
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
    backgroundColor: "#4ead00",
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

