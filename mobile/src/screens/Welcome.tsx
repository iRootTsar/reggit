import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

function WelcomeScreen({navigation}: {navigation: any}) {
    return (
        <View className="flex-1 bg-gray-800 items-center justify-center px-5">
            <Image
                source={require('../images/Komponent_logo_RED_white.png')}
                className="w-64 h-10 mb-5 self-center" // adjust the width and height here
                resizeMode="contain"
            />
            <Text className="text-2xl text-white text-center mb-5">
                Welcome to Komponent!
            </Text>
            <TouchableOpacity
                className="bg-black py-4 rounded-md w-full"
                onPress={() => navigation.navigate('Registration')}>
                <Text className="text-xl text-white text-center">Register</Text>
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;
