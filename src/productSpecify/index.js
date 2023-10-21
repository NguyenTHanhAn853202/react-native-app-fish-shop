import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const star = [1,2,3,4,5]

function ProductSpecify({route}) {
    const slug = route.slug

    const handleChangeStar = (number)=>{
        console.error(number);
    }
    return (
        <View style={styles.container}>
            <View style={styles.product}>
                <Image source={require('../public/image/fish.jpg')} style={styles.img} />
                <View style={styles.containImg}>
                    <Image source={require('../public/image/fish.jpg')} style={styles.subImg} />
                    <Image source={require('../public/image/fish.jpg')} style={styles.subImg} />
                </View>
                <View style={styles.sizeAndNumber}>
                    <View style={styles.sizes}>
                        <Text style={styles.titleSize}>Kích thước</Text>
                        <View style={{flexDirection:'row',gap:10,flexWrap:'wrap'}}>
                            <TouchableOpacity style={styles.size}><Text style={styles.textSize}>M</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.size}><Text style={styles.textSize}>L</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.titleNumber}>Số lượng 10</Text>
                </View>
                <TextInput placeholder="nhập số lượng" value='0' />
                <TouchableOpacity style={styles.order}>
                    <Text style={styles.textOrder}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.description}>
                <Text style={styles.titleDescription}>Vì sao nên mua cá?</Text>
                <Text style={styles.infoDescription}>
                    vì như thế này
                </Text>
            </View>
            <View style={styles.feedback}>
                {star.map(item=>
                <TouchableOpacity key={item} onPress={() =>handleChangeStar(item)} style={styles.btnStar}>
                    <View><FontAwesomeIcon icon={faStar} /></View>
                    <View><FontAwesomeIcon icon={solidStar} /></View>
                </TouchableOpacity>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:30
    },
    img:{
        width:'100%',
        height:200,
        objectFit:'contain'
    },
    containImg:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:10,
        paddingTop:20
    },
    subImg:{
        width:80,
        height:60,
        opacity:0.5
    },
    sizeAndNumber:{
        flexDirection:'row',
        paddingTop:10
    },
    sizes:{
        width:'48%'
    },
    titleSize:{
        fontSize:20
    },
    textSize:{
        fontSize:18
    },
    size:{
        borderWidth:1,
        borderColor:'#00CCFF',
        padding:5,
        paddingRight:30,
        paddingLeft:30,
    },
    titleNumber:{
        fontSize:20
    }


})

export default ProductSpecify;