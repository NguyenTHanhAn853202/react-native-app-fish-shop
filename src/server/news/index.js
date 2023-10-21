import request from "../../axios";

export const showNews = async()=>{
    try {
        const data = await request.get('news')
        return data.data
    } catch (error) {
        console.error(error);
    }
}