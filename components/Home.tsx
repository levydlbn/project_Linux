import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Home = ({ navigation }) => {

    // Dữ liệu mẫu

    const initialCurrentLocation = {
        streetName: "Đại Cồ Việt",
        gps: {
            latitude: 21.007138526185315, 
            longitude: 105.84263348416405,
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Món chính",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Bánh mì",
            icon: icons.hotdog,
        },
        {
            id: 3,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 4,
            name: "Đồ ăn nhẹ",
            icon: icons.fries,
        },
        {
            id: 5,
            name: "Nước uống",
            icon: icons.drink,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Phở",
            rating: 4.8,
            categories: [1],
            priceRating: affordable,
            photo: images.pho_icon,
            duration: "30 - 45 phút",
            location: {
                latitude: 20.984815553001525,
                longitude: 105.84643523525682,
            },
            courier: {
                avatar: images.avatar_3,
                name: "Quán Phở bò Tái lăn"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Phở bò",
                    photo: images.pho_bo,
                    description: "",
                    calories: 200,
                    price: 35000
                },
                {
                    menuId: 2,
                    name: "Phở gà",
                    photo: images.pho_ga,
                    description: "",
                    calories: 250,
                    price: 40000
                }
            ]
        },
        {
            id: 2,
            name: "Pizza",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: "15 - 20 phút",
            location: {
                latitude: 21.004021376139356,
                longitude: 105.85126477610764,
            },
            courier: {
                avatar: images.pizzahut_logo,
                name: "Pizza Hut"
            },
            menu: [
                {
                    menuId: 3,
                    name: "Pizza thịt bò",
                    photo: images.hawaiian_pizza,
                    description: "Thịt Xông Khói, Xúc Xích, Thịt Bò, Giăm Bông Và Pepperoni",
                    calories: 250,
                    price: 230000
                },
                {
                    menuId: 4,
                    name: "Pizza hải sản",
                    photo: images.pizza,
                    description: "Tôm, Mực, Thanh Cua, Hành Tây, Thơm Phủ Xốt Tiêu Đen Thơm Nóng Và Phô Mai Mozzarella",
                    calories: 250,
                    price: 270000
                },
                {
                    menuId: 5,
                    name: "Pizza thập cẩm",
                    photo: images.pizzaThapCam,
                    description: "Thịt Bò, Thịt Xông Khói, Pepperoni, Ớt Chuông, Nấm Và Hành Tây, Phủ Phô Mai Mozzarella",
                    calories: 300,
                    price: 300000
                }
            ]
        },
        {
            id: 3,
            name: "Bánh mì",
            rating: 4.8,
            categories: [2],
            priceRating: expensive,
            photo: images.banhMi,
            duration: "20 - 25 min",
            location: {
                latitude: 20.98381570258784,
                longitude: 105.85066521183006,
            },
            courier: {
                avatar: images.avatar_3,
                name: "Tiệm bánh mì V+"
            },
            menu: [
                {
                    menuId: 7,
                    name: "Bánh mì tam giác",
                    photo: images.banhMiTamGiac,
                    description: "",
                    calories: 100,
                    price: 20000
                },
                {
                    menuId: 8,
                    name: "Bánh mì que",
                    photo: images.banhMiQue,
                    description: "",
                    calories: 100,
                    price: 15000
                }
            ]
        },
        {
            id: 4,
            name: "Món tráng miệng",
            rating: 4.9,
            categories: [4],
            priceRating: affordable,
            photo: images.dessert,
            duration: "35 - 40 min",
            location: {
                latitude: 20.98391408881583,
                longitude: 105.84865583022659,
            },
            courier: {
                avatar: images.avatar_3,
                name: "Kinh Đô Bakery"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Bánh pudding",
                    photo: images.pudding,
                    description: "",
                    calories: 100,
                    price: 10000
                },
                {
                    menuId: 10,
                    name: "Creme Brulee",
                    photo: images.Creme_brulee,
                    description: "",
                    calories: 100,
                    price: 30000
                },
                {
                    menuId: 11,
                    name: "Panna Cotta",
                    photo: images.panna_cotta,
                    description: "",
                    calories: 300,
                    price: 30000
                }
            ]

        },
        {
            id: 5,
            name: "Trà sữa",
            rating: 4.9,
            categories: [5],
            priceRating: affordable,
            photo: images.milktea,
            duration: "35 - 40 min",
            location: {
                latitude: 20.984133401522232,
                longitude: 105.84963416952505,
            },
            courier: {
                avatar: images.ft_logo,
                name: "Feeling Tea Tân Mai"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Coco đào mật",
                    photo: images.coco_dao,
                    description: "",
                    calories: 100,
                    price: 40000
                },
                {
                    menuId: 13,
                    name: "Trà sữa cookie",
                    photo: images.cookie,
                    description: "",
                    calories: 100,
                    price: 30000
                },
                {
                    menuId: 14,
                    name: "Sữa tươi trân châu đường đen",
                    photo: images.blackmilk,
                    description: "",
                    calories: 300,
                    price: 48000
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Thực đơn</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurent", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
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
        paddingTop: 10,
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home