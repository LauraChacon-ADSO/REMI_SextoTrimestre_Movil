import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper"; // importamos la ventana desplazable

import LoginScreen from "./Screens/LoginScreen";
import AdminHomeScreen from "./Screens/AdminHomeScreen";
import VendedorHomeScreen from "./Screens/VendedorHomeScreen";
import GestionUsuarios from "./Screens/GestionUsuarios";
import RegistrarUsuario from "./Screens/RegistrarUsuario";
import EditarUsuariosScreen from "./Screens/EditarUsuariosScreen";
import PerfilScreen from "./Screens/PerfilScreen";
import ProductoScreens from "./Screens/ProductoScreens";
import ProductoDetalle from "./Screens/ProductoDetalle";
import ProveedorScreens from "./Screens/ProveedorScreens";
import ProveedorFormScreens from "./Screens/ProveedorFormScreens";
import ClientesScreens from "./Screens/ClientesScreen";
import ClientesFormScreens from "./Screens/ClientesFormScreen";
import FacturaScreen from "./Screens/FacturaScreen";
import FacturaDetalleScreen from "./Screens/FacturaDetalleScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider> {/*para el menu desplegableee :D*/}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
          <Stack.Screen name="VendedorHome" component={VendedorHomeScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="GestionUsuarios" component={GestionUsuarios} />
          <Stack.Screen name="RegistrarUsuario" component={RegistrarUsuario} />
          <Stack.Screen name="EditarUsuario" component={EditarUsuariosScreen} />
          <Stack.Screen name="Productos" component={ProductoScreens} />
          <Stack.Screen name="ProductoDetalle" component={ProductoDetalle} />
          <Stack.Screen name="Proveedores" component={ProveedorScreens} />
          <Stack.Screen name="ProveedorForm" component={ProveedorFormScreens} />
          <Stack.Screen name="Clientes" component={ClientesScreens} />
          <Stack.Screen name="ClientesForm" component={ClientesFormScreens} />
          <Stack.Screen name="Factura" component={FacturaScreen} />
          <Stack.Screen name="FacturaDetalle" component={FacturaDetalleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}