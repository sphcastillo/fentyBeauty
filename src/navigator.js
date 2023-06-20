import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import { Pressable, Text } from "react-native";
import { FontAwesome5 }  from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const numberOfItems = useSelector(selectNumberOfItems);
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
            >
                <Stack.Screen 
                    name="Products"
                    component={ProductsScreen}
                    options={( { navigation }) => ({
                        headerRight: () => (
                            <Pressable
                                onPress={() => navigation.navigate("Shopping Cart")}
                                style={{ flexDirection: 'row' }}
                            >
                                <FontAwesome5  name="shopping-cart" size={18} color="grey"/>
                                <Text style={{ marginLeft: 5, fontWeight: '500' }}>{numberOfItems}</Text>
                            </Pressable>
                        )
                    })}
                />
                <Stack.Screen 
                    name="Product Details" 
                    options={{ presentation: 'modal' }}
                    component={ProductDetailsScreen}
                />
                <Stack.Screen name="Shopping Cart" component={ShoppingCartScreen}/>
            </Stack.Navigator>

        </NavigationContainer>
    )
};

export default Navigator;