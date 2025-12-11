import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FacturaScreen({ navigation }) {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5059/api/PedidosInfo"; 

  const fetchFacturas = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      if (Array.isArray(res.data)) {
        setFacturas(res.data);
      } else if (Array.isArray(res.data.data)) {
        setFacturas(res.data.data);
      } else {
        setFacturas([]);
      }
    } catch (err) {
      console.error("Error al cargar las facturas:", err);
      setError("No se pudieron cargar las facturas");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchFacturas(); }, []));

  const onRefresh = () => {
    setRefreshing(true);
    fetchFacturas();
  };

  const filteredFacturas = facturas.filter((item) => {
    const text = search.toLowerCase();
    return item.documentoCliente?.toLowerCase().includes(text);
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4ead00ff" />
        <Text style={{ marginTop: 10 }}>Cargando facturas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", fontWeight: "bold" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Facturas</Text>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="receipt-outline" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#2d7211" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar factura por documento"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            setSearch("");
            fetchFacturas();
          }}
        >
          <Text style={styles.searchButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredFacturas}
        keyExtractor={(item, index) =>
          item.codigoPedido ? item.codigoPedido.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate("FacturaDetalle", { factura: item })}
            >
              <Text style={styles.name}>Factura #{item.codigoPedido}</Text>
              <Text style={{ color: "#444", fontSize: 16 }}>Cliente: {item.documentoCliente}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("FacturaDetalle", { factura: item })}
            >
              <Ionicons name="eye-outline" size={30} color="#132692ff" />
            </TouchableOpacity>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay facturas registradas.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    paddingRight: 60,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
  },

  name: { fontSize: 22, fontWeight: "800", color: "#132692ff", width: "100%" },

  header: {
    backgroundColor: "#72CB10",
    paddingVertical: 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },

  headerTitle: {
    color: "#132692ff",
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },

  iconButton: { paddingHorizontal: 5 },

  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#72CB10",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    height: 45,
    marginRight: 10,
  },

  searchInput: { flex: 1, fontSize: 16 },

  searchButton: {
    backgroundColor: "#72CB10",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  searchButtonText: {
    color: "#132692ff",
    fontWeight: "bold",
    fontSize: 16,
  },
});