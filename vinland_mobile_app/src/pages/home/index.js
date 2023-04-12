import styles from "./style";
import { Text, View } from 'react-native';
export const Home = (props) => {
    const { title } = props;
    return <Text style={styles.title} >{title}</Text>
}

