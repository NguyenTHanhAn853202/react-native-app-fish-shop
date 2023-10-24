import AsyncStorage from "@react-native-async-storage/async-storage";
import request from "../../axios";

export const homeProduct = async()=>{
    try {
        const data = await request.get('product/new-product',{
            params: {
                limit:10
            }
        });
        return data.data
    } catch (error) {
        console.log(error);
    }
}
export const products = async()=>{
    try {
        const data = await request.get('product/get-products',{
            params: {
                find:''
            }
        });
        return data.data
    } catch (error) {
        console.error(error);
    }
}

export const product = async(slug)=>{
    try {
        const data = await request.get('product/get-one-product',{
            params: {
                slug:slug
            }
        })
        return data.data
    } catch (error) {
        console.error(error);
    }
}



export const showFeedback = async(idProduct)=>{
    try {
        const data = await request.get('feedback/show',{
            params: {
                idProduct:idProduct
            }
        })
        return data.data
    } catch (error) {
        console.error(error);
    }
}
export const  sendFeedback = async(message,starNumber,idProduct) => {
    try {
        const data = await request.post('feedback/write',{
            id:await AsyncStorage.getItem('id'),
            message,starNumber,idProduct
        })
        return data.data
    } catch (error) {
        console.error(error);
    }
}