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

export const specify = async(slug)=>{
    try {
        const data = await request.get('product/get-one-product',{
            params: {
                slug
            }
        });
        return data.data
    } catch (error) {
        console.error(error);
    }
}