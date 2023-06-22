import { FlatList, StyleSheet, View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartListItem from "../../components/CartListItem";
import cart from "../data/cart";
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice } from "../store/cartSlice";
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from "../store/apiSlice";
import { useStripe } from "@stripe/stripe-react-native";

const ShoppingCartTotals = () => {

    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);

    return (
        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>${subtotal}.00 USD</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>${deliveryFee}.00 USD</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>${total}.00 USD</Text>
            </View>
        </View>
    )
}


const ShoppingCartScreen = () => {

    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const [ createOrder, { data, error, isLoading }] = useCreateOrderMutation();

    // console.log(error, isLoading);
    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const onCheckout = async () => {
        const response = await createPaymentIntent({
            amount: Math.floor(total * 100),
        })

        if (response.error){
            Alert.alert("Payment Intent: Something went wrong");
            return;
        }

        const initResponse = await initPaymentSheet({
            merchantDisplayName: "sphcastillo",
            paymentIntentClientSecret: response.data.paymentIntent,
        });

        if (initResponse.error){
            console.log("initResponse ERROR", initResponse.error);
            Alert.alert("Init Response: Something went wrong");
            return;
        }

        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error){
            Alert.alert(`Error code: ${paymentResponse.error.code}`,
            paymentResponse.error.message
            );
            return;
        }

        onCreateOrder();
    }


    const onCreateOrder = async () => {
        const result = await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
                name: "Beyonce Knowles",
                address: "Los Angeles, California",
                email: "queenbey@beyonce.com"
            }
        });

        if(result.data?.status === 'OK'){
            Alert.alert(
                'Order has been submitted',
                `Your order reference is: ${result.data.data.ref}`
            );
            dispatch(cartSlice.actions.clear());
        }
    }


    return (
        <>
            <FlatList 
                data={cartItems}
                renderItem={({ item })  => <CartListItem cartItem={item} />}
                ListFooterComponent={ShoppingCartTotals}
            />
            <Pressable 
                style={styles.button}
                onPress={onCheckout}
            >
            <Text style={styles.buttonText}>
                Checkout
                {isLoading && <ActivityIndicator />}
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
        paddingBottom: 100
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