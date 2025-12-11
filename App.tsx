import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreens from "./Screens/HomeScreens";
import ProductoScreens from "./Screens/ProductoScreens";
import ProductoDetalle from "./Screens/ProductoDetalle";
import ProveedorScreens from "./Screens/ProveedorScreens";
import ProveedorFormScreens from "./Screens/ProveedorFormScreens";
import ClientesScreens from "./Screens/ClientesScreens";
import ClientesFormScreens from "./Screens/ClientesFormScreens";
import FacturaScreen from "./Screens/FacturaScreen";
import FacturaDetalleScreen from "./Screens/FacturaDetalleScreen";



const Stack = createStackNavigator();

export default function App() {
  return (
        <NavigationContainer><Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreens} />
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
  );
}
