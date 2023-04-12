import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './src/pages/home/style';

//components
import { Home } from './src/pages/home/index';
export default function App() {
  const title = "WELCOME TO VINLAND APP";
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Home  
        title={title}
      />
    </View>
  );
}

