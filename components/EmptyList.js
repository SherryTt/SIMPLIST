import { View, Text, StyleSheet } from 'react-native'

export function EmptyList(props) {
    return (
        <View style={styles.emptyList}>
            <Text style={styles.emptyText}>What is your task today?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyList: {
        flex: 1,
        alignSelf: 'center',
    },
    emptyText: {
        fontSize: 20,
    },
})