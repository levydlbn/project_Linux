import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native'

const Restaurent = ({ route, navigation }) => {
    
    const scrollX = new Animated.Value(0)
    const [restaurent, setRestaurent] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [orderItems, setOrderItems] = useState([])
    
    useEffect(() => {
        let { item, currentLocation } = route.params
        
        setRestaurent(item)
        setCurrentLocation(currentLocation)
    })

    const editOrder = (action, menuId, price) => {

        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId === menuId)

        if (action === "+") {
            if(item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            } 
            setOrderItems(orderList)
        } else {
            if(item.length > 0) {
                if(item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    const getOrderQty = (menuId) => {
        let orderItem = orderItems.filter(a => a.menuId === menuId) 

        if(orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    const getBasketItemCount = () => {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    const sumPriceOrder = () => {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)
        return total.toFixed(2)
    }

    const renderHeader = () => {
        return (
            <View style={{flexDirection: 'row', marginBottom: 6}}>
                <TouchableOpacity style={{
                    width: 50,
                    paddingLeft: 12,
                    justifyContent: 'center',
                   }}
                   onPress={() => navigation.goBack()}
                >
                    <Image 
                       source={(require('../static/images/gobackIcon.png'))}
                       resizeMode='contain'
                       style={{
                           width: 30,
                           height: 30,
                           marginLeft: 6
                       }}
                    />
                </TouchableOpacity>

                {/* Restaurent Name Section */}
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <View
                       style={{
                           height: 50,
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           paddingHorizontal: 18,
                           borderRadius: 25,
                           backgroundColor: '#efefef',
                       }}
                    >
                        <Text style={{fontSize: 18}}>{restaurent?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                   style={{
                       width: 50,
                       paddingRight: 12,
                       justifyContent: 'center'
                   }}
                >
                    <Image 
                       source={(require('../static/images/list1600.png'))}
                       resizeMode='contain'
                       style={{
                           width: 34,
                           height: 34,
                       }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    const renderFoodInfo = () => {
        return (
            <Animated.ScrollView
               horizontal
               pagingEnabled
               scrollEventThrottle={16}
               snapToAlignment='center'
               showsHorizontalScrollIndicator={false}
               onScroll={Animated.event([
                   {nativeEvent: {contentOffset: {x: scrollX}}}
               ], {useNativeDriver: false})}
            >
                {
                    restaurent?.menu.map((item, index) => (
                        <View 
                           key={`menu-${index}`}
                           style={{ alignItems: 'center'}}
                        >
                            <View style={{height: 250}}>
                                <Image 
                                   source={item.photo}
                                   resizeMode='cover'
                                   style={{
                                       width: 368,
                                       height: '100%',
                                       borderRadius: 6,
                                       marginTop: 4,
                                   }}
                                />

                                {/* Quantity */}
                                <View 
                                   style={{
                                      position: 'absolute',
                                      bottom: -22,
                                      width: '94%',
                                      height: 50,
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                   }}
                                >
                                    <TouchableOpacity
                                       style={{
                                           width: 50,
                                           backgroundColor: 'white',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                           borderTopLeftRadius: 25,
                                           borderBottomLeftRadius: 25,
                                       }}
                                       onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{fontSize: 24}}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{
                                        width: 50,
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{fontSize: 22}}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                       style={{
                                           width: 50,
                                           backgroundColor: 'white',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                           borderTopRightRadius: 25,
                                           borderBottomRightRadius: 25,
                                       }}
                                       onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{fontSize: 24}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Name & Desription */}
                            <View
                               style={{
                                   width: 392,
                                   alignItems: 'center',
                                   marginTop: 15,
                                   paddingHorizontal: 12
                               }}
                            >
                                <Text 
                                    style={{marginVertical: 10,
                                            textAlign: 'center',
                                            fontSize: 24}}
                                >{item.name}</Text>
                                <Text style={{fontSize: 16, color: '#444'}}>{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                              style={{
                                  flexDirection: 'row',
                                  marginTop: 10,
                              }}
                            >
                                <Image 
                                   source={require('../static/images/fireIcon.png')}
                                   style={{
                                       width: 20,
                                       height: 24,
                                       marginRight: 10,
                                   }}
                                />
                                <Text style={{fontSize: 18, color: '#888'}}>{item.calories.toFixed(2)} cal</Text>
                            </View>

                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    const renderDots = () => {

        const dotPosition = Animated.divide(scrollX, 412)

        return (
            <View style={{height: 30}}>
               <View
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 6
                  }}
               >
                   {restaurent?.menu.map((item, index) => {

                       const opacity = dotPosition.interpolate({
                           inputRange: [index -1, index, index + 1],
                           outputRange: [0.3, 1, 0.3],
                           extrapolate: 'clamp'
                       })

                       const dotSize = dotPosition.interpolate({
                           inputRange: [index - 1, index, index + 1],
                           outputRange: [8, 10, 8],
                           extrapolate: 'clamp'
                       })

                       const dotColor = dotPosition.interpolate({
                           inputRange: [index - 1, index, index + 1],
                           outputRange: ['#bbb', 'orange', '#bbb'],
                           extrapolate: 'clamp'
                       })

                       return(
                           <Animated.View 
                              key={`dot-${index}`}
                              style={{
                                  borderRadius: 6,
                                  marginHorizontal: 6,
                                  width: dotSize,
                                  height: dotSize,
                                  backgroundColor: dotColor,
                              }}
                           />
                       )
                   })}
               </View>
            </View>
        )
    }

    const renderOrder = () => {
        

        return (
            <View>
                {
                    renderDots()
                }
                <View
                   style={{
                       backgroundColor: 'white',
                       borderTopLeftRadius: 40,
                       borderTopRightRadius: 40
                   }}
                >
                    <View
                      style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 14, 
                          paddingHorizontal: 20,
                          borderBottomColor: '#999',
                          borderBottomWidth: 1
                      }}
                    >
                        <Text style={{fontSize: 18}}>{getBasketItemCount()} item in Cart</Text>
                        <Text style={{fontSize: 18}}>${sumPriceOrder()}</Text>
                    </View>

                    <View
                       style={{
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           paddingVertical: 12,
                           paddingHorizontal: 18,
                       }}
                    >
                        <View
                           style={{
                               flexDirection: 'row',
                               alignItems: 'center'
                           }}
                        >
                            <Image 
                               source={(require('../static/images/pinIcon.png'))}
                               resizeMode='contain'
                               style={{
                                   width: 20,
                                   height: 20,
                                   tintColor: '#999',
                                   marginRight: 6
                               }}
                            />
                            <Text style={{fontSize: 16}}>Location</Text>
                        </View>

                        <View
                          style={{
                              flexDirection: 'row',
                              alignItems: 'center'                              
                          }}
                        >
                            <Image 
                               source={(require('../static/images/MasterCardIcon.png'))}
                               resizeMode='contain'
                               style={{
                                   width: 20,
                                   height: 20,
                                   marginRight: 8,
                                   tintColor: '#999',
                               }}
                            />
                            <Text style={{fontSize: 16}}>9999</Text>
                        </View>
                    </View>

                    {/* Order Buttom */}
                    <View
                      style={{
                          padding: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                    >
                        <TouchableOpacity
                          style={{
                              width: '100%',
                              padding: 12,
                              backgroundColor: 'orange',
                              alignItems: 'center',
                              borderRadius: 30
                          }}
                          onPress={() => navigation.navigate("Order", {
                              restaurent: restaurent,
                              currentLocation: currentLocation,
                          })}
                        >
                            <Text style={{fontSize: 24, color: 'white'}}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
       <SafeAreaView style={styles.container}>
           {renderHeader()}
           {renderFoodInfo()}
           {renderOrder()}
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        marginTop: 30,
        paddingTop: 12,
    }
})

export default Restaurent
