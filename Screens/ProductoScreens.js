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
import { useFonts } from "expo-font";

export default function ProductoScreens({ navigation }) {
  const [loaded] = useFonts({
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    MerriweatherBold: require("../assets/fonts/Merriweather_24pt-Bold.ttf"),
    Geom: require("../assets/fonts/Geom-Regular.ttf"),
    GeomBold: require("../assets/fonts/Geom-Bold.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

 const API_URL = "http://10.33.125.19:5059/api/productos";

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) {
        setProductos(res.data);
      } else if (Array.isArray(res.data.data)) {
       setProductos(res.data.data);
      } else {
       setProductos([]);
      }
    } catch (err) {
      console.error("Error al cargar los productos:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
  useCallback(() => {
   fetchProductos();
  }, [])
);
  const onRefresh = () => {
    setRefreshing(true);
    fetchProductos();
  };


  const filteredProductos = productos.filter((item) => {
    const texto = search.toLowerCase();
    return (
     item.nombreProducto?.toLowerCase().includes(texto) 
    );
  });

  if (!loaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 16 }}>Cargando fuente...</Text>
      </View>
    );
  }
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4ead00ff" />
        <Text style={{ marginTop: 10 }}>Cargando productos...</Text>
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
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="cube-outline" size={35} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Productos</Text>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="cube-outline" size={35} color="#fff" />
      </TouchableOpacity>
    </View>

 
    <View style={styles.searchRow}>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#2d7211" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto por nombre"
          value={search}
          onChangeText={setSearch}
        />
      </View>

     
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          setSearch("");      
          fetchProductos();   
        }}
      >
        <Text style={styles.searchButtonText}>Limpiar</Text>
      </TouchableOpacity>

    </View>

   
    <FlatList
      data={filteredProductos}
      keyExtractor={(item, index) =>
        item.codigoProducto ? item.codigoProducto.toString() : index.toString()
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("ProductoDetalle", { producto: item })}
          >
            <Text style={styles.name}>{item.nombreProducto}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ProductoDetalle", { producto: item })}
          >
            <Ionicons name="eye-outline" size={30} color="#132692ff" />
          </TouchableOpacity>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No hay productos registrados.
        </Text>
      }
      contentContainerStyle={{ paddingBottom: 100 }}
    />

  </View>
);
}
  

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 15 
  },

  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },

  card: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    paddingRight: 60, 
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",        
  },



  name: { 
    fontSize: 25, 
    fontFamily: "GeomBold", 
    color: "#132692ff", 
    width: "100%",   
  },

  
  header: {
    backgroundColor: "#72cb10",
    paddingVertical: 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },

  headerTitle: {
    color: "#0303B5",
    fontSize: 30,
    fontFamily: "GeomBold",
    textAlign: "center",
    flex: 1,
  },

  iconButton: {
    paddingHorizontal: 5,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#72cb10",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,     
    height: 45,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000ff",
  },

  searchButton: {
    backgroundColor: "#72cb10",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  searchButtonText: {
    color: "#0303B5",
    fontFamily: "GeomBold",
    fontSize: 16,
  },
});
