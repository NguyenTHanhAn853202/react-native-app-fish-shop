const LOGIN ='login'
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const CART = 'CART'
const USER_NAME = 'user_name'
export {LOGIN, ACCESS_TOKEN, REFRESH_TOKEN,USER_NAME,CART}


export const init = {
    login:false,
    accessToken:'',
    refreshToken:'',
    expiresIn:0,
    cart:[],
    userName:''
}

export const reducer = (state,action)=>{
    const {key,value} = action
    switch(key){
        case LOGIN:
            return {...state,login:value}
        case ACCESS_TOKEN:
            return {...state,accessToken:value.accessToken,expiresIn:value.expiresIn}
        case REFRESH_TOKEN:
            return {...state,refreshToken:value}
        case CART:
            return {...state,cart:value}
        case USER_NAME:
            return {...state,userName:value}
        default:
            return;
    }
}




