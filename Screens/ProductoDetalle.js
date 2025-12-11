import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function ProductoDetalle({ route, navigation }) {
  const [loaded] = useFonts({
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    MerriweatherBold: require("../assets/fonts/Merriweather_24pt-Bold.ttf"),
    Geom: require("../assets/fonts/Geom-Regular.ttf"),
    GeomBold: require("../assets/fonts/Geom-Bold.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const { producto } = route.params;

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

    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Productos")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalle del Producto</Text>

        <View style={{ width: 28 }} />
      </View>

      
      <View style={styles.card}>

        <Text style={styles.label}>Código:</Text>
        <Text style={styles.value}>{producto.codigoProducto}</Text>

        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{producto.nombreProducto}</Text>

        <Text style={styles.label}>Entrada:</Text>
        <Text style={styles.value}>{producto.entradaProducto}</Text>

        <Text style={styles.label}>Salida:</Text>
        <Text style={styles.value}>{producto.salidaProducto}</Text>

        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{producto.marcaProducto}</Text>

        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.value}>${producto.precioProducto}</Text>

        <Text style={styles.label}>Código Subcategoría:</Text>
        <Text style={styles.value}>{producto.codigoSubCategorias}</Text>

        <Text style={styles.label}>Documento Proveedor:</Text>
        <Text style={styles.value}>{producto.documentoProveedor}</Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f4",
    paddingHorizontal: 20,
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
    color: "#132692ff",
    fontSize: 30,
    fontFamily: "GeomBold",
    textAlign: "center",
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    color: "#444",
  },

  value: {
    fontSize: 18,
    color: "#000",
  },
});
