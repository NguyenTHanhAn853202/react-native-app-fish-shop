import { Image, StyleSheet, Text, View } from 'react-native';
import { imageServer } from '../ultils';

function CartProduct({data}) {
    return (
    <View style={styles.container}>
        {data.map((item, index) =>
        {
            
           return <View key={index} style={styles.containProduct}>
            <Image style={styles.img} source={{uri:imageServer(item.image[0])}} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Giá: {item.price} VND</Text>
            </View>
        }
        )}
       
    </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:10,
    },
    containProduct:{
        boxSizing:'border-box',
        width:'48%',
        backgroundColor:'#CFCFCF',
        padding:10,
        borderRadius:10,
        justifyContent:'center'
    },
    img:{
        width:'100%',
        height:180,
        objectFit:'contain'
    },
    name:{
        textAlign:'center',
        fontSize:20
    },
    price:{
        fontSize:18,
        textAlign:'center',
    }


    


})

export default CartProduct;