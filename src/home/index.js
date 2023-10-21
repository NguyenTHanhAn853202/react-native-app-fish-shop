import { View,Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import CartProduct from "../component/cartProduct";
import { useEffect, useState } from "react";
import { homeProduct } from "../server/product";



function Home() {
    const [data,setData] = useState([])
    
    useEffect(()=>{
        (async()=>{
            const data = await homeProduct()
            if(data.success) {
                setData(data.data)
            }
        })()
    },[])

    return (  <ScrollView style={styles.home}>
        <View style={styles.containBanner}>
            <ImageBackground style={styles.banner}  resizeMode="cover" source={require('../public/image/fish.jpg')} />
        </View>
        <Text style={styles.title}>Các sản phẩm mới</Text>
        <CartProduct data={data} />
    </ScrollView>);
}

const styles = StyleSheet.create({
    home:{
        flex:1, 
        backgroundColor:'white'
    },
    containBanner:{
        flex:1, 
        justifyContent: 'center',
        margin:20,
        borderRadius:15,
        overflow:'hidden',
    },
    banner:{
        flex:1,
        height:230,
    },
    title:{
        fontSize:25,
    },
})
export default Home;