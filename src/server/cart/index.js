import AsyncStorage from "@react-native-async-storage/async-storage";
import request from "../../axios";

export const showCart = async() =>{
    try {
        const data = await request.get('cart/get',{
            params:{
                id:AsyncStorage.getItem('id'),
                perPage:30,
                page:1
            }
        });
        return data.data
    } catch (error) {
        console.log(error);
    }
}