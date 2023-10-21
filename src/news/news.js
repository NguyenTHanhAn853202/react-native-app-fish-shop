import { Image, StyleSheet, Text, View } from "react-native";
import { imageServer } from "../ultils";


function News({route}) {
    const {data} = route.params;
    
    return (
    <View style={styles.news}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.content}>{data?.information}</Text>
        <View style={styles.containImg}>
            <Image style={styles.img} source={{uri:imageServer(data.image)}} />
            <Text style={styles.nameImg}>{data?.titleImage}</Text>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    news:{
        flex:1,
        backgroundColor:'white',
        padding:10
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:24,
        padding:10
    },
    content:{
        fontSize:16
    },
    containImg:{
        width:'100%',
        paddingLeft:30,
        paddingRight:30,
        marginTop:20
    },
    img:{
        width:'100%',
        objectFit:'cover',
        height:200,
    },
    nameImg:{
        fontSize:16,
        fontWeight:'bold',
        fontStyle:'italic',
        textAlign:'center',
        paddingTop:5
    }


})

export default News;