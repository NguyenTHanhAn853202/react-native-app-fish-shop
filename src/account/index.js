import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { logout } from "../server/account";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Context } from "../Context";
import { LOGIN } from "../Context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";





function Account() {
    const navigate = useNavigation().navigate
    const [states,dispatch] = useContext(Context)

    const handleLogout = async()=>{
        const data = await logout()
        console.error(data);
        if(data?.check){
            await AsyncStorage.setItem('userName','')
            await AsyncStorage.setItem('id','')
            await AsyncStorage.setItem('accessToken','')
            await AsyncStorage.setItem('expiresIn','')
            await AsyncStorage.setItem('refreshToken','')
            await AsyncStorage.setItem('login','0')
            dispatch({key:LOGIN,value:false})
            navigate('Home')
        }
    }

    return ( 
    <SafeAreaView style={styles.account}>
        {!states.login?
        <>
            <TouchableOpacity onPress={()=>{navigate('Login')}} style={styles.function}>
                <Text style={styles.text}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigate('Register')}} style={styles.function}>
                <Text style={styles.text}>Đăng ký</Text>
            </TouchableOpacity>
        </>
        :<>
        <View style={styles.person}>
            <Image style={styles.img} source={require('../public/image/fish.jpg')} />
            <Text style={styles.name}>Nguyen thanh an</Text>
        </View>
        <TouchableOpacity style={styles.function}>
            <Text style={styles.text}>Xem đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.function}>
            <Text style={styles.text}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.function}>
            <Text style={styles.text}>Cập nhật thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.function}>
            <Text style={styles.text}>Đăng xuất</Text>
        </TouchableOpacity>
        </>}
            
    </SafeAreaView> );
}

const styles = StyleSheet.create({
    account:{
        flex:1,
        backgroundColor:'white',
        paddingTop:50,
    },
    person:{
        flexDirection:'row',
        alignItems:'center',
        gap:30,
        justifyContent: 'center',
    },
    img:{
        width:70,
        height:70,
        // objectFit:'cover'
    },
    name:{
        fontSize:20,
    },
    function:{
        backgroundColor:'#e8e8e8',
        marginTop:20,
    },
    text:{
        fontSize:20,
        paddingTop:10,
        paddingBottom:10,
        textAlign:'center',
    }

})

export default Account;