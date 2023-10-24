import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { imageServer } from '../ultils';
import { useNavigation } from '@react-navigation/native';

function CartProduct({data}) {
    const navigate = useNavigation().navigate
    const handleNavigateToSpecifyProduct = (item)=>{
        navigate('ProductSpecify',{slug:item.slug,idProduct:item._id})
    }
    return (
    <View  style={styles.container}>
        {data.map((item, index) =>
        {
            
           return <TouchableOpacity onPress={()=>handleNavigateToSpecifyProduct(item)} key={index} style={styles.containProduct}>
            <Image style={styles.img} source={{uri:imageServer(item.image[0])}} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Giá: {item.price} VND</Text>
            </TouchableOpacity>
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