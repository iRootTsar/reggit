import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';

function WelcomeScreen({navigation}: {navigation: any}) {
    return (
        <View className="flex-1 bg-gray-800 items-center justify-center px-5">
            <Image
                source={require('../images/Miles_transparent.png')}
                className="w-64 h-10 mb-5 self-center" // adjust the width and height here
                resizeMode="contain"
            />
            <Text
                style={[
                    tw`text-white mb-4`,
                    {fontFamily: 'CircularStd-Medium', fontSize: 30},
                ]}>
                Velkommen til Miles!
            </Text>
            <TouchableOpacity
                className="bg-black py-4 rounded-md w-96"
                onPress={() => navigation.navigate('Photo')}>
                <Text
                    style={[
                        tw`text-white text-center`,
                        {fontFamily: 'CircularStd-Medium', fontSize: 23},
                    ]}>
                    Registrer
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;
