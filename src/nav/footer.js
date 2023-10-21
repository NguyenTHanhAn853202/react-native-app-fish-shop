import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";


function Footer() {
    const navigate = useNavigation().navigate
    const handleGotoNews = (value)=>{
        switch(value){
            case 1: 
                return navigate('Home')
            case 2 :
                return navigate('NewsEvent')
            case 3 :
                return navigate('Product')
            case 4:
                return navigate('Person')
            default:
                return ;
        }
    }

    return (
    <View style={styles.footer}>
        <TouchableOpacity onPress={()=>handleGotoNews(1)}>
            <FontAwesomeIcon size={25} icon={faHouse} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleGotoNews(2)}>
            <FontAwesomeIcon size={25} style={styles.news} icon={faNewspaper} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleGotoNews(3)}>
            <FontAwesomeIcon size={25} style={styles.product} icon={faCartShopping} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleGotoNews(4)}>
            <FontAwesomeIcon size={25} style={styles.user} icon={faUser} />
        </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
    footer:{
        boxSizing: 'border-box',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:30,
        paddingLeft:30,
        height:70,
        alignItems:'center',
        backgroundColor:'#E8E8E8',
    }
})

export default Footer;