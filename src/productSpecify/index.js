import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Fragment, useEffect, useMemo, useState } from "react";
import { product, sendFeedback, showFeedback } from "../server/product";
import { imageServer } from "../ultils";
import { add } from "../server/cart";

const star = [1,2,3,4,5]

function ProductSpecify({route}) {
    const {slug,idProduct} = route.params
    const [data,setData] = useState({
        image:['empty'],
        size:['empty'],
    })
    const [feedback,setFeedback] = useState([])
    const [size,setSize] = useState(0)
    const [number,setNumber] = useState(0)
    const [image,setImage] = useState('empty')
    const [starNumber,setStarNumber] = useState(0)
    const [message,setMessage] = useState('')
    const [numberInStore,setNumberInStore] = useState(0)


        useEffect(()=>{
            (async()=>{
                const [data,feedback] = await Promise.all([product(slug),showFeedback(idProduct)])
                if(data.success) {
                    // console.error(data.data.data);
                    setImage(data.data.data.image[0])
                    setNumberInStore(data.data.data.number)
                    setData(data.data.data)
                }
                if(feedback.success){
                    setFeedback(feedback.data)
                }
            })()
        },[slug])

        const starAverage = useMemo(()=>{
            return feedback.reduce((average,item,index)=>
            (average*(index)+item?.starNumber)/(index+1) ,0)
        },[JSON.stringify(feedback)])



    const handleAddToCart = async()=>{
        if(!number || number <=0) return
        const newSize = data.image[size] 
        const price = number * data.price
        const dataCart = await add(idProduct,number,newSize,image,price)
        if(dataCart?.success){
            setNumberInStore(numberInStore-number)
            setNumber(0)
            setSize(0)
        }
    }
    const handleSendFeedback = async()=>{
        const data = await sendFeedback(message,starNumber,idProduct)
        if(data.success){
            setFeedback(props=> [ data.data,...props])
            setMessage('')
            setStarNumber(0)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.product}>
                <Image source={{uri:imageServer(image)}} style={styles.img} />
                <View style={styles.containImg}>
                    {data.image.map((item,index)=>{
                        const activeImage = item === image?{opacity:1}:{}
                        return <TouchableOpacity key={index} onPress={()=>setImage(item)}>
                            <Image key={index} source={{uri:imageServer(item)}} style={{...styles.subImg,...activeImage}} />
                        </TouchableOpacity>
                    })}
                </View>
                <View style={styles.sizeAndNumber}>
                    <View style={styles.sizes}>
                        <Text style={styles.titleSize}>Kích thước</Text>
                        <View style={{flexDirection:'row',gap:10,flexWrap:'wrap'}}>
                            {data.size.map((item,index)=>{
                                const activeSize = index === size?{backgroundColor:'#00FFFF'}:{}
                                return <TouchableOpacity onPress={()=>{setSize(index)}} key={index} style={{...styles.size,...activeSize}}><Text style={styles.textSize}>{item}</Text></TouchableOpacity>
                            })}
                        </View>
                    </View>
                    <View style={styles.number}>
                        <Text style={styles.titleNumber}>Số lượng còn: {numberInStore}</Text>    
                        <TextInput value={number}  onChangeText={(value)=>setNumber(value*1)} keyboardType="number-pad" style={styles.textNumber} placeholder="nhập số lượng mua"  />
                    </View>
                </View>
                <Text style={styles.textPrice}>Giá: {data?.price}VND</Text>
                <Button onPress={handleAddToCart} title="Thêm vào giỏ hàng" style={styles.order} />
            </View>
            <View style={styles.description}>
                <Text style={styles.titleDescription}>Vì sao nên mua {data?.name}?</Text>
                <Text style={styles.infoDescription}>{data?.description}</Text>
            </View>
            <View style={styles.feedback}>
                <Text style={styles.feedbackTitle}>Đánh giá</Text>
                <Text style={styles.perStar}>{Math.floor(starAverage*10)/10}/5 sao</Text>
                <View style={styles.feedbackStar}>
                    {star.map((item,index)=>{
                        const style = Math.floor(starAverage)>=index+1?styles.starAcitve:styles.starNoAction
                        
                        return <View key={item} style={styles.btnStar}>
                            <View style={{...styles.star}}><FontAwesomeIcon style={{color: '#FFD700'}} icon={faStar} /></View>
                            <View style={{...styles.star,...style}}><FontAwesomeIcon style={{color: '#FFD700'}} icon={solidStar} /></View>
                        </View>
                    })}
                </View>
                <View style={styles.containWritteFeedback}>
                    <Text style={styles.titleWrite}>Viết đánh giá của bạn</Text>
                    <View style={styles.feedbackStar}>
                        {star.map((item,index)=>{
                            const activeStar = index+1<=starNumber?styles.starAcitve:styles.starNoAction
                        return <TouchableOpacity key={item} onPress={() =>setStarNumber(index+1)} style={styles.btnStar}>
                            <View style={styles.star}><FontAwesomeIcon style={{color: '#FFD700'}} icon={faStar} /></View>
                            <View style={{...styles.star,...activeStar}}><FontAwesomeIcon style={{color: '#FFD700'}} icon={solidStar} /></View>
                        </TouchableOpacity>
                        })}
                    </View>
                    <TextInput value={message} onChangeText={(value)=>setMessage(value)} style={styles.ipWrite} placeholder="Viết suy nghĩ của bạn" />
                    <Button onPress={handleSendFeedback} title='Gửi' style={styles.submitFeedback} />
                </View>
                <View style={styles.feedbackContent}>
                    {feedback.map((item,index) =>
                        <View style={styles.containMessageFeedback} key={index}>
                            <View style={styles.account}>
                                <Image style={styles.avatar} source={{uri:imageServer(item?.userID?.avatar)}} />
                                <View >
                                    <View style={{flexDirection:'row'}}>
                                        {star.map((index)=>{
                                            const starHidden = item.starNumber>=index?styles.starAcitve:styles.starNoAction
                                            return <View key={index} style={styles.btnStar}>
                                                <View style={{...styles.star}}><FontAwesomeIcon style={{color: '#FFD700'}} icon={faStar} /></View>
                                                <View style={{...styles.star,...starHidden}}><FontAwesomeIcon style={{color: '#FFD700'}} icon={solidStar} /></View>
                                            </View>
                                        })}
                                    </View>
                                    <Text style={styles.userName}>{`${item?.userID?.name}`}</Text>
                                </View>
                               
                            </View>
                            <Text style={styles.userFeedback}>{item?.message}</Text>
                            {item.reply.map((message,index) =>
                                <Text key={index} style={styles.reply}>Admin: {message}</Text>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

export default ProductSpecify;