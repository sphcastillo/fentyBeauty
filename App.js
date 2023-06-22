import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from "./src/store";
import Navigator from './src/navigator';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY = 
'pk_test_51NLukIDJpb5c4dYOGdvWSXKYWFeb9XvLjZ2mh762Zi2b1O7uLOy4Z8FxZXkhZrtNHmMsW8Nv27tZjMmAsBZRuDmv00BGPaWzB5'

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <Navigator />
        <StatusBar style="auto" />
      </StripeProvider>
    </Provider>
  );
}

