// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

export default function LoginScreen({ navigation }) {
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!documento.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor ingresa documento y contraseña");
      return;
    }

    try {
      setLoading(true);

      // Realizar la solicitud de login
      const res = await api.post("/auth/login", {
        documento: documento.trim(),
        password: password.trim(),
        rememberMe: true,
      });

      console.log("API Respuesta:", res.data);

      // 📌 Tu API devuelve directamente estos campos
      const { token, rol, nombre, documento: docApi } = res.data;

      if (!token) {
        Alert.alert("Error", "Credenciales incorrectas");
        return;
      }

      const rolNormalizado = rol?.toLowerCase();
      console.log("Rol recibido:", rolNormalizado);

      // Guardar token y usuario en AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem(
        "usuario",
        JSON.stringify({ nombre, documento: docApi, rol: rolNormalizado })
      );

      // Navegar según el rol
      if (rolNormalizado === "admin") {
        navigation.replace("AdminHome");
      } else if (rolNormalizado === "vendedor") {
        navigation.replace("VendedorHome");
      } else {
        Alert.alert("Error", "Rol desconocido");
      }
    } catch (err) {
      console.log("Error login:", err.response?.data || err.message);
      Alert.alert("Error", "No fue posible conectar con la API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.welcome}>Bienvenido al Sistema REMI</Text>

      <View style={styles.card}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Iniciar sesión</Text>

        <TextInput
          placeholder="Documento"
          placeholderTextColor="#666"
          value={documento}
          onChangeText={setDocumento}
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
  width: "100%",          
  maxWidth: 420,          
  backgroundColor: "#fffdfdff", 
  borderRadius: 12,
  padding: 24,           
  elevation: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  borderWidth: 1,
  borderColor: "#e0e0e0",
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 16,   
  marginTop: 40,          
},

  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#092d57e3",
  },
  welcome: {
    fontSize: 16,
    color: "#004AAD",
    marginBottom: 14,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#bcc3d4ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: "#030202ff",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#339250ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});