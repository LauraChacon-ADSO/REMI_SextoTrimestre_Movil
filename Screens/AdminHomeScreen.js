import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminHomeScreen({ navigation }) {
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
    { title: "Usuarios", icon: "people-outline", route: "GestionUsuarios" },
  ];

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={30} color="#fff" />
        <Text style={styles.headerText}>Sistema REMI</Text>

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
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
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