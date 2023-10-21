import { useContext, useEffect, useState } from "react";
import {  Button, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {AsyncStorage} from 'react-async-storage';
import { login } from "../server/account";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../Context";
import { LOGIN } from "../Context/reducer";

function Login() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigation().navigate
    const [states,dispatch] = useContext(Context)


    const handleLogin = async()=>{
        const data = await login(userName,password)
        
        if(data.check){
            await AsyncStorage.setItem('userName',userName)
            await AsyncStorage.setItem('id',data.id)
            await AsyncStorage.setItem('accessToken',data.token.accessToken)
            await AsyncStorage.setItem('expiresIn',data.token.expiresIn+'')
            await AsyncStorage.setItem('refreshToken',data.refreshToken)
            await AsyncStorage.setItem('login','1')
            dispatch({key:LOGIN,value:true})
            navigate('Home')
            setPassword('')
            setUserName('')
        }
    }

    return (<View style={styles.login}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={styles.info}>
            <Text  style={styles.text}>Tài khoản</Text>
            <TextInput value={userName} onChangeText={setUserName} style={styles.textInput} placeholder='Nhập tài khoản' />
            <Text style={styles.text}>Mật khẩu</Text>
            <TextInput secureTextEntry={true}   value={password} onChangeText={setPassword} style={styles.textInput} placeholder='Nhập mật khẩu' />
        </View>
        <Button onPress={handleLogin} title="Đăng nhập" style={styles.btn} />
    </View>);
}

const styles = StyleSheet.create({
    login:{
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:24,
        paddingBottom:30
    },
    info:{
        width:'80%'
    },
    text:{
        fontSize:20
    } ,
    textInput:{
       borderColor:'#00CCFF',
       borderWidth:1,
       width:'100%',
       height:50,
       paddingLeft:10,
       paddingRight:10,
       fontSize:18,
       marginBottom:30
    }

})

export default Login;