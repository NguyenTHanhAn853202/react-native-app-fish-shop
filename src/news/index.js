import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { showNews } from "../server/news";
import { imageServer } from "../ultils";

function NewsEvents() {
    const navigate = useNavigation().navigate
    const [data,setData] = useState([])
    useEffect(()=>{
        (async()=>{
            const data = await showNews()
            if(data.success) {
                setData(data.data)
            }
        })()
    },[])

    return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>
            Tin tức và sự kiện
        </Text>

        {data.map((item,index)=>{
            
            return <View key={index} style={styles.news}>
            <Image source={{uri:imageServer(item.image)}} style={styles.img} />
            <View style={styles.info}>
                <Text  style={styles.title}>{item.title}</Text>
                <Text  ellipsizeMode='tail' numberOfLines={3} style={styles.content}>{item.information}</Text>
                <Button onPress={()=>{navigate('News',{data: item})}} title="Đọc thêm" style={styles.btn} />
            </View>
            </View>
        })}
    </ScrollView>);
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white'
    },
    text:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
        paddingBottom:30,
        paddingTop:20
    },
    news:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:20
    },
    img:{
        width:'40%',
        height:'90%',
        objectFit:'contain',
    },
    info:{
        marginLeft:'5%',
        width:'55%',
        overflow:'hidden',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',

    },
    content:{
        fontSize:16,
        
    }
})

export default NewsEvents;