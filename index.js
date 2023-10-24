import { NavigationContainer } from "@react-navigation/native";
import Header from "./src/nav/header";
import Footer from "./src/nav/footer";
import { StyleSheet, View } from "react-native";
import HomePage from './src/home'
import News from './src/news/news';
import Product from './src/product';
import Account from './src/account';
import { createNativeStackNavigator   } from '@react-navigation/native-stack';
import { useContext, useEffect } from "react";
import {Context} from './src/Context'
import { ACCESS_TOKEN, CART, LOGIN } from "./src/Context/reducer";
import request from "./src/axios";
import Login from "./src/login";
import Register from "./src/register";
import { refreshToken } from "./src/server/account";
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { showCart } from "./src/server/cart";
import NewsEvents from "./src/news";
import ProductSpecify from "./src/productSpecify";



const Stack = createNativeStackNavigator();

function GolobalApp() {
  const [states,dispatch] = useContext(Context)
  
    request.interceptors.request.use(
      async (config) => {
        if(config && config?.url!==undefined){
          const url = config?.url;
          // console.error(url);
          if (
              url?.includes('get-products') ||
              url?.includes('login') ||
              url?.includes('account/refreshTokens') ||
              url?.includes('logout') ||
              url?.includes('account/create')||
              url?.includes('/new-product') ||
              url.includes('news') ||
              url.includes('get-one-product')||
              url.includes('feedback/show')||
              url.includes('get-one-product')
          )
              return config;
          const timeNow = Date.now();
          let expiresIn = await AsyncStorage.getItem('expiresIn') * 1;
          let newAccessToken = await AsyncStorage.getItem('accessToken')
          if (timeNow > expiresIn) {
              const token = await AsyncStorage.getItem('refreshToken');
              const {
                  token: { accessToken, expiresIn:expiresInNow },
              } = await refreshToken(token);
              newAccessToken = accessToken
              expiresIn = expiresInNow
              config.headers.Authorization = newAccessToken;
          }
          await AsyncStorage.setItem('accessToken',newAccessToken);
          await AsyncStorage.setItem('expiresIn',expiresIn+'');
          return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    },
    )

    useEffect(()=>{
      (async()=>{
        const login = await AsyncStorage.getItem('login')==='1'?true:false
        // if(login){
        //   const data = await showCart()
        //   dispatch({key:CART,value:data.data})
        // }
        dispatch({key:LOGIN,value:login})
      })()
    },[])

    return (<NavigationContainer>
      
        <Header />
          <View style={styles.body}>
              <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}} >
                <Stack.Screen name="Home" component={HomePage}  />
                <Stack.Screen name="News" component={News} />
                <Stack.Screen name="Product" component={Product} />
                <Stack.Screen name="Person" component={Account} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="NewsEvent" component={NewsEvents} />
                <Stack.Screen name="ProductSpecify" component={ProductSpecify} />
              </Stack.Navigator>
          </View>
        <Footer/>
      </NavigationContainer>);
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        paddingLeft:10,
        paddingRight:10,
      }
})

export default GolobalApp;