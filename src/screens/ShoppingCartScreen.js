import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import CartListItem from "../../components/CartListItem";
import cart from "../data/cart";


const ShoppingCartScreen = () => {

    const cartItems = useSelector((state) => state.cart.items);
    return (
        <>
            <FlatList 
                data={cartItems}
                renderItem={({ item })  => <CartListItem cartItem={item} />}
                ListFooterComponent={() => (
                    <View style={styles.totalsContainer}>
                        <View style={styles.row}>
                            <Text style={styles.text}>Subtotal</Text>
                            <Text style={styles.text}>100.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Delivery</Text>
                            <Text style={styles.text}>15.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Total</Text>
                            <Text style={styles.text}>115.00</Text>
                        </View>
                    </View>
                )}
            />
            <Pressable 
                style={styles.button}
            >
            <Text style={styles.buttonText}>
                Checkout
            </Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderColor: "gainsboro",
        borderTopWidth: 1,
      },
      row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 2,
      },
      text: {
          fontSize: 16,
          color: 'grey'
      },
      textBold: {
          fontSize: 16,
          fontWeight: '500'
      },
      button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: "white",
        fontWeight: '500',
        fontSize: 16
    }
      
});

export default ShoppingCartScreen;