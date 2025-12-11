import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

export default function VendedorHomeScreen({ navigation }) {
  const [loaded] = useFonts({
    Merriweather: require("../assets/fonts/Merriweather_24pt-Regular.ttf"),
    MerriweatherBold: require("../assets/fonts/Merriweather_24pt-Bold.ttf"),
    Geom: require("../assets/fonts/Geom-Regular.ttf"),
    GeomBold: require("../assets/fonts/Geom-Bold.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    closeMenu();
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  const items = [
    { title: "Proveedores", icon: "business-outline", route: "Proveedores" },
    { title: "Productos", icon: "cube-outline", route: "Productos" },
    { title: "Clientes", icon: "cash-outline", route: "Clientes" },
    { title: "Facturas", icon: "receipt-outline", route: "Factura" },
  ];

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
      {/* Header fijo */}
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={30} color="#fff" />
        <Text style={styles.titulo}>Sistema <Text style={styles.headerText}>REMI</Text></Text>

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Ionicons name="person-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate("Perfil");
            }}
            title="Mi perfil"
          />
          <Divider />
          <Menu.Item onPress={handleLogout} title="Cerrar sesión" />
        </Menu>
      </View>

      {/* Contenido scrollable */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80, alignItems: "center" }}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.route)}>
            <Ionicons name={item.icon} size={40} color="#004AAD" />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
    fontFamily: "GeomBold",
    textAlign: "center",
    flex: 1,
  },

  titulo: {
    color: "#132692ff",
    fontSize: 25,
    fontFamily: "Geom",
  },

  card: {
    width: 250,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 16,
    // Android
    elevation: 8,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    // Borde sutil
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#004AAD",
    fontWeight: "600",
  },
});