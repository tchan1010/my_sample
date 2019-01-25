import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    whiteButton: {
        backgroundColor: 'white'
    },

    redButton: {
        backgroundColor: 'red'
    },

    yellowButton: {
        backgroundColor: 'yellow'
    },

    orangeButton: {
        backgroundColor: 'orange'
    },

    greenButton: {
        backgroundColor: 'green'
    },

    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },

    displayContainer: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },

    blankContainer: {
        flex: 1,
        backgroundColor: 'black'
    },

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D',
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },

    keyButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }, 

    input: {
      height: 10,
      borderColor: '#7a42f4',
      borderWidth: 1,
      color: 'white'
   }
});

export default Style;
