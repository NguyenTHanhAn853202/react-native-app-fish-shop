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

export const add = async(idProduct,number,size,image,price)=>{
    try {
        const data = await request.post('cart/add-product',{
            id: await AsyncStorage.getItem('id'),
            idProduct,number,size,image,price
        })
        return data.data
    } catch (error) {
        console.error(error);
    }
}