import AsyncStorage from "@react-native-async-storage/async-storage";
import request, { post } from "../../axios"

export const register = async(userName,password) => {
    try {
        const data = await request.post('account/create',{
            
                userName: userName,
                password: password
            
        })
        return data.data
    } catch (error) {
        console.error(error.message + '1');
    }
}

export const login = async(userName, password) => {
    try {
        const data = await request.post('account/login', {
            userName: userName,
            password: password
        })
        return data.data
    } catch (error) {
        
    }
}

export const logout = async () => {
    try {
        const data = await request.post('account/logout',{
            userName: await AsyncStorage.getItem('userName'),
        })
        return data.data
    } catch (error) {
        console.error(error);
    }
}

export const refreshToken = async (token = '',userName) => {
    try {
        const datas = await request.post('account/refreshTokens', {
            userName: await  AsyncStorage.getItem('userName'),
            token: token,
        });
        return datas.data;
    } catch (error) {
        console.log(error);
    }
};