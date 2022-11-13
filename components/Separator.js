import { View, StyleSheet } from 'react-native'

export function Separator( props ) {
    return(
        <View style={ styles.separator }></View>
    )
}

const styles = StyleSheet.create( {
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
} )