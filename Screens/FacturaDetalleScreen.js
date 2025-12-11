import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function FacturaDetalle({ route, navigation }) {
  const [loaded] = useFonts({
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    MerriweatherBold: require("../assets/fonts/Merriweather_24pt-Bold.ttf"),
    Geom: require("../assets/fonts/Geom-Regular.ttf"),
    GeomBold: require("../assets/fonts/Geom-Bold.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const { factura } = route.params;

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
        <TouchableOpacity onPress={() => navigation.navigate("Factura")}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detalle de la Factura</Text>

        <View style={{ width: 28 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Número de factura:</Text>
        <Text style={styles.value}>{factura.codigoPedido}</Text>

        <Text style={styles.label}>Documento del cliente:</Text>
        <Text style={styles.value}>{factura.documentoCliente}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{factura.estadoPedido}</Text>

        <Text style={styles.label}>Valor total:</Text>
        <Text style={styles.value}>${factura.valorPedido}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{factura.fechaPedido}</Text>

        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{factura.horaPedido}</Text>

        <Text style={styles.label}>Productos:</Text>
        {factura.detallesP?.map((item, index) => (
          <View key={index} style={{ marginTop: 10 }}>
            <Text style={styles.label2}>Código producto: {item.codigoProducto}</Text>
            <Text style={styles.label2}>Cantidad: {item.cantidadProducto}</Text>
            <Text style={styles.label2}>Precio: ${item.valorProducto}</Text>
            <Text style={styles.label2}>Total: ${item.totalPagoProducto}</Text>
          </View>
        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f4", paddingHorizontal: 20 },

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

  label2: { fontSize: 15, color: "#333", marginLeft: 10 },

  value: { fontSize: 18, color: "#000" },
});