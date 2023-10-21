import { useEffect, useState } from "react";
import {  Button, StyleSheet, Text, TextInput, View } from "react-native";
import { register } from "../server/account";
import validator from "validator";

function Register() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] =  useState('')
    const [rePassword,setRePassword] = useState('')

    const handleRegister = async()=>{
        if(validator.isEmail(userName) && password.length>7 && password ===rePassword){
            const data = await register(userName, password)
            // console.error(data);
        }
    }

    return (<View style={styles.login}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={styles.info}>
            <Text style={styles.text}>Tài khoản</Text>
            <TextInput value={userName} onChangeText={setUserName} style={styles.textInput} placeholder='Nhập tài khoản' />
            <Text style={styles.text}>Mật khẩu</Text>
            <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.textInput} placeholder='Nhập mật khẩu' />
            <Text style={styles.text}>Nhập lại mật khẩu</Text>
            <TextInput secureTextEntry value={rePassword} onChangeText={setRePassword} style={styles.textInput} placeholder='Nhập lại mật khẩu' />
        </View>
        <Button onPress={handleRegister} title="Đăng ký" style={styles.btn} />
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

export default Register;