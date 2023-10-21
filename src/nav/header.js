import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {  Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function Header() {
    return (<View style={styles.header}>
        <Image style={styles.logo} source={require('../public/image/logo.png')} />
        <View style={styles.search}>
            <TextInput placeholder="Tìm kiếm sản phẩm" style={styles.ip}/>
            <TouchableOpacity style={styles.searchIcon}>
                <FontAwesomeIcon style={{color:'#999',}} size={20}  icon={faMagnifyingGlass} />
            </TouchableOpacity>
        </View>
        <View style={styles.viewCart}>
            {/* <Text style={styles.cartNumber}>3</Text> */}
            <TouchableOpacity style={styles.cart}>
                <FontAwesomeIcon size={25} icon={faCartShopping} />
            </TouchableOpacity>
        </View>
    </View>);
}

const  styles = StyleSheet.create({
    header:{
        // boxSizing:'border-box',
        flex:0,
        height:130,
        flexDirection:'row',
        position:'relative',
        top:0,
        left:0,
        right:0,
        backgroundColor:'#00CCFF',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        paddingTop:70
    },
    logo:{
        height:50,
        width:50,
        objectFit:'cover'
    },
    search:{
        width:200,
        flexDirection:'row',
        margin:10,
        boxSizing:'border-box',
        paddingLeft:10,
        paddingRight:10,
        alignItems: 'center',
        backgroundColor:'white',
        justifyContent:'center',
        paddingTop:5,
        paddingBottom:5,
        borderRadius:7
    },
    ip:{
        flex:1,
        height:30,
        
    },
    searchIcon:{
        width:20,
        marginLeft:5
    },
    viewCart:{
        position:'relative'
    },
    cartNumber:{
        position:'absolute',
        top:-10,
        right:-10,
        backgroundColor:'white',
        width:20,
        height:20,
        textAlign:'center',
        zIndex:9,
        borderRadius:50
    }
})

export default Header;