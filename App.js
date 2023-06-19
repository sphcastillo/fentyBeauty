import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from "./src/store";
import Navigator from './src/navigator';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

