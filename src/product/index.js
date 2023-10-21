import { StyleSheet, Text, View } from "react-native";
import CartProduct from "../component/cartProduct";
import { useEffect, useState } from "react";
import { products } from "../server/product";

function Product() {
    const [data,setData] = useState([])

    useEffect(()=>{
        (async()=>{
            const data = await products()
            if(Array.isArray(data)){
                setData(data)
            }
        })()
    },[])

    return (  
        <View style={styles.product}>
            <Text style={styles.title}>Tất cả sản phẩm</Text>
            <CartProduct data={data} />
        </View>
    );
}

const styles = StyleSheet.create({
    product:{
        flex: 1,
        backgroundColor:'white',
        paddingTop:30,
    },
    title: {
        fontWeight:'bold',
        fontSize:24,
        paddingBottom:20
    }
})

export default Product;