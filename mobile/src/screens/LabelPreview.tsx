import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import axios from 'axios';
import {CreateVisitorDTO} from 'clients';
import {config} from '../../config';
import RNPrint from 'react-native-print';
import {Button} from 'react-native-elements';

function LabelPreview({route, navigation}: {route: any; navigation: any}) {
    const {name, phone, email, organization, image} = route.params;

    axios.defaults.baseURL = config.ngrokDomain;

    const confirmAndPrint = () => {
        const requestBody: CreateVisitorDTO = {
            name,
            email,
            phone,
            organization,
            image,
        };

        const prepareHTML = () => {
            return `
                <html>
                <head>
                    <style>
                        @page {
                            size: 29mm 90mm; 
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            font-family: Arial, sans-serif; 
                        }
                        .label {
                            display: flex;
                            flex-direction: row;

                            align-items: center;
                            width: 29mm;  
                            height: 90mm;
                            padding: 2mm;  
                        }
                        .rotated-text {
                            transform: rotate(270deg);
                            white-space: nowrap;
                            font-size: 32px;  // Increased font size
                            line-height: 38px;  // Adjusted line-height for the larger font
                            margin-left: 1mm;  // Reduced margin
                        }
                        .rotated-text:first-child {
                            margin-right: 1mm;  // Reduced margin
                        }
                    </style>
                </head>
                <body>
                    <div class="label">
                        <h3 class="rotated-text">${name}</h3>
                        <h3 class="rotated-text">${organization}</h3>
                    </div>
                </body>
                </html>
            `;
        };

        axios
            .put('/Visit', requestBody)
            .then(response => {
                console.log(response);
                const html = prepareHTML();
                RNPrint.print({
                    html,
                });
                navigation.navigate('Home');
                // Handle successful registration
            })
            .catch(error => {
                console.log(error);
                // Handle failed registration
            });
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
                <Text style={tw`text-black text-center mb-1 text-xl`}>
                    {name}
                </Text>
                <Text style={tw`text-black text-center mb-1 text-xl`}>
                    {organization}
                </Text>
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
        height: 29 * 3.779528,
        padding: 2 * 3.779528,
    },
    text: {
        fontSize: 20,
        marginLeft: 2 * 3.779528,
    },
    textFirstChild: {
        marginRight: 2 * 3.779528,
    },
});

export default LabelPreview;
