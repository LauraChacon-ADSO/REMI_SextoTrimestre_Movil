import React from "react";
import { ScrollView, View ,Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeCustomScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      
    
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={30} color="#fff" />
        <Text style={styles.headerText}>Sistema Remi</Text>
        <Ionicons name="cart-outline" size={30} color="#fff" />
      </View>

   
      <View style={styles.cardContainer}>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate("Proveedores")}
        >
          <Ionicons name="business-outline" size={40} color="#004AAD" />
          <Text style={styles.cardTitle}>Proveedores</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate("Productos")}
        >
          <Ionicons name="cube-outline" size={40} color="#004AAD" />
          <Text style={styles.cardTitle}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate("Clientes")}
        >
          <Ionicons name="people-outline" size={40} color="#004AAD" />
          <Text style={styles.cardTitle}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate("Factura")}
        >
          <Ionicons name="receipt-outline" size={40} color="#004AAD" />
          <Text style={styles.cardTitle}>Facturas</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#4ead00",
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },

  cardContainer: {
    marginTop: 10,
    alignItems: "center",
    gap: 20,
  },

  card: {
    width: 250,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,     
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#004AAD",
    fontWeight: "600"
  }
});