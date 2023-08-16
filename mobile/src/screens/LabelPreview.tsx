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
                        .label {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            width: 80mm;  /* tilpasse ønsket størrelse */
                            height: 40mm;  /* tilpasse ønsket størrelse */
                            border: 1px solid black;
                            padding: 10px;
                            box-sizing: border-box;
                            page-break-inside: avoid;  /* avoid page breaks inside the label */
                        }
                    </style>
                </head>
                <body>
                    <div class="label">
                        <h3>Navn: ${name}</h3>
                        <h3>${organization}</h3>
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
            <View style={styles.label}>
                <Text style={tw`text-black text-center mb-1`}>{name}</Text>
                <Text style={tw`text-black text-center mb-1`}>
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
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        marginBottom: 40, // More space between label and buttons
    },
});

export default LabelPreview;
