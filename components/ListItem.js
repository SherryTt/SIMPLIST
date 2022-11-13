import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';

export function ListItem(props) {
    return (
        <View style={(props.completed) ? styles.itemDone : styles.item}>

            
            <TouchableHighlight
                style={styles.updateButton}
                onPress={() => props.update(props.id)}
            >
                <Image style={styles.doneLogo}
                    source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACiklEQVRoge3ZS6hNURgH8J+3vEJxrwEpI4XBjZJSTEyQUjfvCVOvlIGRRDdDxcRYKZQoAxMyo5Q8SjG4jER3oO4l5XUM1trt23XuPWftc+7Zm86/dqvO/h7/f2et7/tWmy666KIV9GIAz/EFtQ4+V9slYl8J5LPnMWa1Q8R+/I5Bb2Ez5rYjcCfRixFBxImSuYzFwhTjAfk/USUcwUdsbNbhhSBk82QxKoCt+C5s9wPNOmXbqipnYhWGBE7nUhyzylEFLMYbgc9NTElxroqQGXggcHmKOakBqiLkqsDjPXqKBKiCkDORwzDWFQ1StpDd+IWf2DmOTVP9rUwhffKx6Ng4NtsFkQ1RlpDl+BBzX5nALhPaEGUImSdM2DXcx/QJbJvm12khU3E35nyt8TxVWSGXYr4hoYs3QiWFHIm5vmFTkz6VE7INP4RB8GCCX9uFTMMNHE4gkWE1Psc8ZxN92y6kP9r9xtEEIkswGH2vSxwEE/glba3j8ivxxSbsZ+KRFgbBFH6pZ+SQsNdruCyU03qYgmvR7p2Cg2AKvyKHfZdQeWoC2XoN7ax8EFybGL8Qv6JVa6tAsiY0uNmj3vULW/AndhSIXYhfK+V3g/xa+hDzsR5f428pRaFlfq32kTXy4e8JPsnPTzvQ0Ya4Em9HxWo0CKag4519GV7iFRa0IV6GUkaURVjRplgZKjdrFUVdfuM1r38OXSFVw38t5Etc53WSSJPIyvjw2Bf1hAzGtW/S6BRHxmlw7It6Qu7FtWpfq+BkXO9NaBXRI/9GcmqyGBXAafk1YGmzTnvlN7/b2KKcDz9zY+478mv1ntQge+X/TBWe4SIiMvTgAp6VJGok5j4vYTt10UUXf+MPIhRKtbWYy3gAAAAASUVORK5CYII=',
                    }} />
            </TouchableHighlight>

          
            <View style={styles.listText}>
                <Text style={styles.itemName}> {props.name} </Text>
            </View>

            
            <View>
                <TouchableOpacity style={styles.delButton}
                    onPress={() => props.delete(props.id)}>

                    <Image style={styles.delLogo}
                        source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAZUlEQVRIiWNgGCmggYGB4T8a7iBGIyMWsf8UOgbFTCYKDSMbwIKBYvU09wGxFqC7kGgfDhofjFowasGoBRQAFiLVoRfr2Ip5rGDAgugplEavxXBhZD1EAT8GBoYnJFjwBKpnGAIAUcAmPA1WYN0AAAAASUVORK5CYII=',
                        }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemName: {
        fontSize: 16,
    },
    doneLogo: {
        width: 25,
        height: 25,
    },
    delLogo: {
        width: 25,
        height: 25,
    },
    item: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    itemDone: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#536878'
    },
    listText: {
        flex: 1,
        alignSelf: 'center',
    },
    updateButton: {
        padding: 10,
    },
    delButton: {
        padding: 10,
    },
})