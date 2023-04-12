import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './src/pages/home/style';
import { Button } from 'react-native-paper';
//components
import { Home } from './src/pages/home/index';
export default function App() {
  const title = "WELCOME TO VINLAND APP";
  return (
    <View style={styles.container}>
      <Home title={title} />
    </View>
  );
}

