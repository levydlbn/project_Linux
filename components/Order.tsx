import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

const Order = ({ route, navigation }) => {

    const mapView = useRef()
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBV-lXGDU_YWDIggtNuEqIv-j93ZmhAvN8'

    const [restaurent, setRestaurent] = useState(null)
    const [streetName, setStreetName] = useState('')
    const [fromLocation, setFromLocation] = useState(null)
    const [toLocation, setTolocation] = useState(null)
    const [region, setRegion] = useState(null)  

    const [duration, setDuration] = useState(30)
    const [isReady, setIsReady] = useState(false)
    const [angle, setAngle] = useState(0)
    
    useEffect(() => {
        let { restaurent, currentLocation } = route.params

        let fromLoc = currentLocation.gps
        let toLoc = restaurent.location
        const currentLocations = currentLocation
        let street = currentLocations.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
        }

        setRestaurent(restaurent)
        setStreetName(street)
        setFromLocation(fromLoc)
        setTolocation(toLoc)
        setRegion(mapRegion)

    },[])

    const calculateAngle = (coordinates) => {
        let startLat = coordinates[0]["latitude"]
        let starLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - starLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    const zoomIn = () => {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200) 
    }

    const zoomOut = () => {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200) 
    }

    const renderMap = () => {

 
        const destinationMarker = () => (
            <Marker
               coordinate={fromLocation}
            >
                <View
                  style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                  }}
                >
                    <View
                      style={{
                          height: 34,
                          width: 34,
                          borderRadius: 16,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fa6115',
                      }}
                    >
                        <Image 
                           source={(require('../static/images/pinIcon.png'))}
                           style={{
                               width: 20,
                               height: 28,
                               tintColor: 'white'
                           }}
                        />
                    </View>
                </View>
            </Marker>
        )

        const carIcon = () => (
            <Marker
               coordinate={toLocation}
               anchor={{x: 0.5, y: 0.5}}
               flat={true}
               rotation={angle}
            >
                <Image 
                   source={(require('../static/images/carIcon.png'))}
                   style={{
                       width: 40,
                       height: 40,
                   }}
                />
            </Marker>
        )


        return (
            <View style={{flex: 1,}}>
                <MapView 
                  ref={mapView}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={region}
                  style={{ flex: 1 }}
                >
                    <MapViewDirections 
                       origin={fromLocation}
                       destination={toLocation}
                       apikey={GOOGLE_MAPS_APIKEY}
                       strokeWidth={5}
                       strokeColor="blue"
                       optimizeWaypoints={true}
                       onReady={result => {
                           setDuration(20)

                           if(!isReady) {
                               // fit route into maps
                               

                               // reposition the car
                               let nextLoc = {
                                   latitude: result.coordinates[0]["latitude"],
                                   longitude: result.coordinates[0]["longitude"]
                               }

                               if(result.coordinates.length >= 2) {
                                   let angle = calculateAngle(result.coordinates)
                                   setAngle(angle)
                               }

                               setFromLocation(nextLoc)
                               setIsReady(true)
                           }
                       }}
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    const renderDestinationHeader = () => {
        return (
            <View
              style={{
                  position: 'absolute',
                  top: 50,
                  left: 0,
                  right: 0,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
            >
                <View
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 380,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 25,
                      backgroundColor: 'white'
                  }}
                >
                    <Image 
                       source={(require('../static/images/pinIcon.png'))}
                       style={{
                           width: 20,
                           height: 28,
                           marginRight: 6,
                           tintColor: '#444'
                       }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: '#444' }}>{streetName}</Text>
                    </View>

                    <Text style={{ fontSize: 18 }}>{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }

    const renderdeliveryIndo = () => {
        return (
            <View
              style={{
                  position: 'absolute',
                  bottom: 30,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
            >
                <View 
                   style={{
                       width: 380,
                       paddingVertical: 18,
                       paddingHorizontal: 12,
                       borderRadius: 25,
                       backgroundColor: 'white'
                   }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Image 
                            source={restaurent?.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: 6}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{fontSize: 16, color: '#222'}}>{restaurent?.courier.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <Image 
                                       source={(require('../static/images/starIcon.png'))}
                                       style={{
                                           width: 18,
                                           height: 18,
                                           tintColor: 'orange',
                                           marginRight: 6,
                                       }}
                                    />
                                    <Text style={{fontSize: 18}}>{restaurent?.rating}</Text>
                                </View>
                            </View>

                            <Text style={{fontSize: 16, color: '#666'}}>{restaurent?.name}</Text>
                        </View>
                    </View>

                    {/* buttoms */}
                    <View
                       style={{
                           flexDirection: 'row',
                           marginTop: 12,
                           justifyContent: 'space-between'
                       }}
                    >
                        <TouchableOpacity
                           style={{
                               flex: 1,
                               marginRight: 10,
                               height: 50,
                               backgroundColor: 'orange',
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 10,
                           }}

                           onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={{fontSize: 18, color: 'white'}}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={{
                               flex: 1,
                               height: 50,
                               backgroundColor: '#999',
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 10,
                           }}
                           onPress={() => navigation.goBack()}
                        >
                            <Text style={{fontSize: 18, color: 'white'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const renderButtons = () => {
        return (
            <View
               style={{
                   position: 'absolute',
                   bottom: 280,
                   right: 12,
                   width: 60,
                   height: 130,
                   justifyContent: 'space-between',
               }}
            >
                {/*Zoom in  */}
                <TouchableOpacity
                   style={{
                       width: 60,
                       height: 60,
                       borderRadius: 30,
                       backgroundColor: 'white',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}
                   onPress={() => zoomIn()}
                >
                    <Text style={{fontSize: 26}}>+</Text>
                </TouchableOpacity>

                {/* Zoom out */}
                <TouchableOpacity
                   style={{
                       width: 60,
                       height: 60,
                       borderRadius: 30,
                       backgroundColor: 'white',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}
                   onPress={() => zoomOut()}
                >
                    <Text style={{fontSize: 26}}>-</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, }}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderdeliveryIndo()}
            {renderButtons()}
        </View>
    )
}

export default Order
