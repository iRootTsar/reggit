import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';
//import RNPrint from 'react-native-print';

function LabelPreviewScreen({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) {
    const {name, phone, email, organization} = route.params;

    // const printHTML = async () => {
    //     await RNPrint.print({
    //         html: `<div>
    //                     <p>${name}</p>
    //                     <p>${organization}</p>
    //                </div>`,
    //     });
    //     navigation.navigate('Home');
    // };

    return (
        <View style={tw`flex-1 bg-gray-800 justify-start items-center p-5`}>
            <Text style={tw`text-white text-center font-bold mt-10 mb-5`}>
                Registered Information
            </Text>
            <View style={tw`mb-5 items-start w-1/2`}>
                <Text style={tw`text-white text-left mb-1`}>
                    <Text style={tw`font-bold`}>Name:</Text> {name}
                </Text>
                <Text style={tw`text-white text-left mb-1`}>
                    <Text style={tw`font-bold`}>Phone:</Text> {phone}
                </Text>
                <Text style={tw`text-white text-left mb-1`}>
                    <Text style={tw`font-bold`}>Email:</Text> {email}
                </Text>
                <Text style={tw`text-white text-left mb-1`}>
                    <Text style={tw`font-bold`}>Organization:</Text>{' '}
                    {organization}
                </Text>
            </View>

            <Text style={tw`text-white text-center font-bold mb-5 mt-10`}>
                Label Preview
            </Text>
            <View style={styles.label}>
                <Text style={tw`text-black text-center mb-1`}>{name}</Text>
                <Text style={tw`text-black text-center mb-1`}>
                    {organization}
                </Text>
            </View>

            <View style={tw`mt-10`}>
                <TouchableOpacity
                    style={tw`bg-blue-500 p-3 mb-8 rounded`}
                    onPress={() => navigation.goBack()}>
                    <Text style={tw`text-white text-center`}>
                        Change information
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`bg-blue-500 p-3 rounded`}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={tw`text-white text-center`}>
                        Confirm and print
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        marginBottom: 40, // More space between label and buttons
    },
});

export default LabelPreviewScreen;
