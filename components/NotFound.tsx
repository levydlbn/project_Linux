import React from 'react'
import { Image, View } from 'react-native'

const NotFound = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image 
              source={(require('../static/images/notFound.jpg'))}
              style={{
                  width: '100%',
                
              }}

            />
        </View>
    )
}

export default NotFound
