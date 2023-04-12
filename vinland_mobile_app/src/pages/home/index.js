import styles from "./style";

export const Home = (props) => {
    const { title } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title} >{title}</Text>
        </View>
    );
}

