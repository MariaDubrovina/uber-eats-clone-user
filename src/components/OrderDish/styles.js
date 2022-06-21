import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    root: {
        flexDirection: 'row',
        margin: 10,
    },
    image: {
        height: 100,
        width: 100
    },
    rightContainer: {
        padding: 10,
        
    },
    title: {
       fontSize: 18,
       fontWeight: 'bold',
    },
    
    price: {
        fontSize: 17,
        color: 'grey',
        marginVertical: 5
    },
    date: {
        fontSize: 17,
        color: 'grey'
    }
});

export default styles;