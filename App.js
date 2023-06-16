import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ShoppingCartScreen from "./src/screens/ShoppingCartScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import Navigator from './src/navigator';
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      {/* <Navigator /> */}
      {/* <ProductsScreen /> */}
      {/* <ProductDetailsScreen /> */}
      <ShoppingCartScreen />
    </>
  );
}

