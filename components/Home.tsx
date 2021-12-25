import React, { useState } from 'react'
import { Image, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native'



const Home = ({ navigation }) => {

    const initialCurrentLocation = {
        streetName: "Hai Bà Trưng, Hà Nội",
        gps: {
            latitude: 21.009940,
            longitude: 105.849603
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: (require('../static/images/rice.png')),
        },
        {
            id: 2,
            name: "Noodles",
            icon: (require('../static/images/noodle.png')),
        },
        {
            id: 3,
            name: "Hot Dogs",
            icon: (require('../static/images/hotdog.png'))
        },
        {
            id: 4,
            name: "Salads",
            icon: (require('../static/images/salad.png'))
        },
        {
            id: 5,
            name: "Burgers",
            icon: (require('../static/images/burger.png'))
        },
        {
            id: 6,
            name: "Pizza",
            icon: (require('../static/images/pizza.png')),
        },
        {
            id: 7,
            name: "Snacks",
            icon: (require('../static/images/frices.png')),
        },
        {
            id: 8,
            name: "Sushi",
            icon: (require('../static/images/sushi.png')),
        },
        {
            id: 9,
            name: "Desserts",
            icon: (require('../static/images/donut.png')),
        },
        {
            id: 10,
            name: "Drinks",
            icon: (require('../static/images/drink.png')),
        },

    ]

     // price rating
     const affordable = 1
     const fairPrice = 2
     const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "ByProgrammers Burger",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: (require('../static/images/burgerImg.jpg')),
            duration: "30 - 45 min",
            location: {
                latitude: 21.021755,
                longitude: 105.832024,
            },
            courier: {
                avatar: (require('../static/images/people1.png')),
                name: "le thi hoan"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: (require('../static/images/burgerImg1.jpg')),
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: (require('../static/images/burgerImg2.jpg')),
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: (require('../static/images/burgerImg3.jpg')),
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "ByProgrammers Pizza",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: (require('../static/images/pizzaImg.jpg')),
            duration: "15 - 20 min",
            location: {
                latitude: 21.008800,
                longitude: 105.833807,
            },
            courier: {
                avatar: (require('../static/images/people2.png')),
                name: "Tran xuan phieu"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: (require('../static/images/pizzaImg1.jpg')),
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: (require('../static/images/pizzaImg2.jpg')),
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: (require('../static/images/tomatoPastaImg1.jpg')),
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: (require('../static/images/saladImg1.jpg')),
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "ByProgrammers Hotdogs",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: (require('../static/images/hotdogImg.jpg')),
            duration: "20 - 25 min",
            location: {
                latitude: 20.007167,
                longitude: 105.834150,
            },
            courier: {
                avatar: (require('../static/images/people3.jpg')),
                name: "Nguyen Loc Tai"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: (require('../static/images/hotdogImg1.jpg')),
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "ByProgrammers Sushi",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo: (require('../static/images/sushiImg.jpg')),
            duration: "10 - 15 min",
            location: {
                latitude: 20.999432,
                longitude: 105.846016,
            },
            courier: {
                avatar: (require('../static/images/people4.png')),
                name: "Nguyen Quoc Dat"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: (require('../static/images/sushiImg1.jpg')),
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "ByProgrammers Cuisine",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: (require('../static/images/cuisineImg.jpg')),
            duration: "15 - 20 min",
            location: {
                latitude: 21.004039,
                longitude: 105.847254,
            },
            courier: {
                avatar: (require('../static/images/people5.jpg')),
                name: "Tran Minh Ha"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: (require('../static/images/noodleImg1.jpg')),
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: (require('../static/images/noodleImg2.jpg')),
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: (require('../static/images/riceImg1.jpg')),
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: (require('../static/images/riceImg2.jpg')),
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "ByProgrammers Dessets",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: (require('../static/images/dessetsImg.jpg')),
            duration: "35 - 40 min",
            location: {
                latitude: 21.008157,
                longitude: 105.848434,
            },
            courier: {
                avatar: (require('../static/images/people6.png')),
                name: "Nguyen Quan Dai"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: (require('../static/images/tehImg1.jpg')),
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: (require('../static/images/iceImg1.jpg')),
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: (require('../static/images/kekLapisImg1.jpg')),
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]

    
    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

    const onSelectCategory = (category) => {
       
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))
        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    const getCategoryNameById = (id) => {
        let category = categories.filter(a => a.id === id)

        if(category.length > 0)
          return category[0].name
        
        return ""
    }

    const renderHeader = () => {
        return (
            <View style={{flexDirection: 'row', height: 50}}>
                <TouchableOpacity 
                   style={{
                       width: 50,
                       paddingLeft: 18,
                       justifyContent: 'center'
                   }}
                >
                   <Image 
                      source={require('../static/images/nearby.png')}
                      resizeMode="contain"
                      style={{
                          width: 34,
                          height: 34,
                      }}
                   />
                </TouchableOpacity>
                
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '70%',
                        height: '100%',
                        backgroundColor: '#efefef',
                        borderRadius: 30,
                        }}
                    >
                        <Text style={{fontSize: 18}}>{currentLocation.streetName}</Text>
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
                      source={require('../static/images/basket.png')}
                      resizeMode="contain"
                      style={{
                          width: 30,
                          height: 30,
                      }}
                   />
                </TouchableOpacity>
            </View>
        )
    }

    const renderMainCategories = () => {

        const renderItem = ({item}) => {
            return (
                <TouchableOpacity 
                   style={{
                        padding: 10,
                        backgroundColor: (selectedCategory?.id === item.id) ? 'orange' : '#efefef',
                        borderRadius: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                        shadowColor: '#999',
                   }}

                   onPress={() => onSelectCategory(item)}
                >
                    <View style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (selectedCategory?.id === item.id) ? 'white' : '#efefef'
                    }}>
                        <Image source={item.icon} 
                               resizeMode='contain'
                               style={{
                                   width: 34,
                                   height: 34,
                               }}
                        />
                    </View>

                    <Text style={{
                        marginTop: 2,
                        marginBottom: 4,
                        color: (selectedCategory?.id === item.id) ? 'white' : 'black',
                        fontSize: 12,
                    }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{padding: 12}}>
                <FlatList 
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{padding: 6, marginTop: 6}}
                />
            </View>
        )
    }

    const renderRestaurantList = () => {

        const renderItem = ({item}) => {

            return (
              <TouchableOpacity
                 style={{ marginBottom: 12 }}
                 onPress={() => navigation.navigate("Restaurent", {
                     item,
                     currentLocation
                 })}
              >
                <View style={{
                    marginTop: 6
                }}>
                    <Image 
                       source={item.photo}
                       resizeMode='cover'
                       style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 20,
                       }}
                    />

                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        height: 50,
                        width: '30%',
                        backgroundColor: 'white',
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 18}}>{item.duration}</Text>
                    </View>
                 </View>

                 {/* Restaurant info */}

                 <Text style={{fontSize: 18, marginTop: 6}}>{item.name}</Text>

                 <View style={{
                     marginTop: 6,
                     flexDirection: 'row',
                     alignItems: 'center'
                     
                 }}>
                    {/* Rating */}
                    <Image 
                       source={(require('../static/images/starIcon.png'))}
                       style={{
                           height: 20,
                           width: 20,
                           tintColor: 'orange',
                           marginRight: 10
                       }}
                    />
                    <Text style={{fontSize: 14}}>{item.rating}</Text>

                    {/* Categories */}
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 10
                    }}
                    >
                        {
                            item.categories.map((categoryId) => (
                                <View style={{
                                    flexDirection: 'row',
                                     }}
                                       key={categoryId}   
                                >
                                    <Text style={{fontSize: 14, color: '#444'}}>{getCategoryNameById(categoryId)}</Text>
                                    <Text style={{fontSize: 14, color: '#444'}}> . </Text>
                                </View>
                            ))
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                  key={priceRating}
                                  style={{
                                      color: (priceRating <= item.priceRating) ? 'black' : '#999'
                                  }}
                                >$</Text>
                            ))
                        }
                    </View>
                 </View>

              </TouchableOpacity>

            )
        }

        return (
            <FlatList 
               data={restaurants}
               keyExtractor={item => `${item.id}`}
               renderItem={renderItem}
               contentContainerStyle={
                   {
                       paddingHorizontal: 12,
                       paddingBottom: 30,

                   }
               }
            />

        )
    }

    return (
        <SafeAreaView style={styles.container}>
           {renderHeader()}
           {renderMainCategories()}
           {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: 52,
    }
})



export default Home