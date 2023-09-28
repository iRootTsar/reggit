import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import axios from 'axios';
import {CreateVisitorDTO} from 'clients';
import {config} from '../../config';
import {Button} from 'react-native-elements';

function LabelPreview({route, navigation}: {route: any; navigation: any}) {
    const {name, phone, email, organization, image} = route.params;

    axios.defaults.baseURL = config.ngrokDomain;

    const confirmAndPrint = async () => {
        const requestBody: CreateVisitorDTO = {
            name,
            email,
            phone,
            organization,
            image,
        };

        try {
            // If the printing request was successful, add the person to the database
            await axios.put('/Visit', requestBody);

            // Print request and database update completed
            navigation.navigate('Home');
        } catch (error) {
            console.error('Printing error:', error);
            // Handle the error here (e.g., show an error message to the user)
        }
    };

    return (
        <View style={tw`flex-1 bg-gray-800 justify-start items-center p-8`}>
            <Text
                style={[
                    tw`text-white text-center font-bold mt-10 mb-5`,
                    {fontFamily: 'CircularStd-Medium'},
                    {fontSize: 20},
                ]}>
                Registered Information
            </Text>
            <View style={tw`mb-5 flex-row`}>
                <View style={tw`items-start w-1/2`}>
                    <Text style={tw`text-white text-left mb-1`}>
                        <Text
                            style={[
                                tw`font-bold`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}>
                            Name:
                        </Text>{' '}
                        {name}
                    </Text>
                    <Text style={tw`text-white text-left mb-1`}>
                        <Text
                            style={[
                                tw`font-bold`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}>
                            Phone:
                        </Text>{' '}
                        {phone}
                    </Text>
                    <Text style={tw`text-white text-left mb-1`}>
                        <Text
                            style={[
                                tw`font-bold`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}>
                            Email:
                        </Text>
                        {email}
                    </Text>
                    <Text style={tw`text-white text-left mb-1`}>
                        <Text
                            style={[
                                tw`font-bold`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}>
                            Organization:
                        </Text>{' '}
                        {organization}
                    </Text>
                </View>

                <View style={tw`items-center justify-center mt-0`}>
                    <Image
                        source={{uri: `data:image/png;base64,${image}`}}
                        style={{width: 100, height: 100}}
                    />
                </View>
            </View>
            <Text
                style={[
                    tw`text-white text-center font-bold mt-10 mb-5`,
                    {fontFamily: 'CircularStd-Medium'},
                    {fontSize: 20},
                ]}>
                Label Preview
            </Text>
            <View style={[styles.label, tw`mb-10`]}>
                <Text
                    style={[
                        tw`text-black text-center mb-1 text-xl font-bold`,
                        // {fontFamily: 'Helsinki'},
                        // {fontSize: 20},
                    ]}>
                    {name}
                </Text>
                <Text
                    style={[
                        tw`text-black text-center mb-1 text-xs`,
                        // {fontFamily: 'Helsinki'},
                        // {fontSize: 10},
                    ]}>
                    {organization}
                </Text>
                <Image
                    source={require('../images/mileslogo.png')}
                    style={styles.image}
                />
            </View>
            <View style={tw`w-96`}>
                <Button
                    title="Change information"
                    onPress={() => navigation.goBack()}
                    buttonStyle={tw`bg-black py-4 mb-4 rounded-md w-full`}
                    titleStyle={[
                        tw`text-white text-center`,
                        {fontFamily: 'CircularStd-Medium'},
                    ]}
                />
                <Button
                    title="Confirm and print"
                    onPress={confirmAndPrint}
                    buttonStyle={tw`bg-black py-4 rounded-md w-full`}
                    titleStyle={[
                        tw`text-white text-center`,
                        {fontFamily: 'CircularStd-Medium'},
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        borderRadius: 5,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90 * 3.779528, // Convert mm to dp (1mm is approximately 3.779528 dp)
        height: 23 * 3.779528,
        padding: 2 * 3.779528,
    },
    text: {
        fontSize: 20,
        marginLeft: 2 * 3.779528,
    },
    textFirstChild: {
        marginRight: 2 * 3.779528,
    },
    labelContent: {
        flex: 1,
    },
    image: {
        position: 'absolute',
        bottom: 7,
        left: 10,
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
    },
});

export default LabelPreview;
