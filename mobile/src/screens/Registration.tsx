/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {launchCamera, CameraOptions} from 'react-native-image-picker';
import tw from 'tailwind-react-native-classnames';

function Registration({navigation}: {navigation: any}) {
    const [photo, setPhoto] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fornavn: '',
        etternavn: '',
        tlfNr: '',
        email: '',
        organisasjon: '',
    });

    const takePhoto = () => {
        let options: CameraOptions = {
            mediaType: 'photo',
            includeBase64: true,
        };
        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log(
                    'ImagePicker Error: ',
                    response.errorCode,
                    response.errorMessage
                );
            } else {
                const uri = response.assets && response.assets[0]?.uri;
                if (uri) {
                    setPhoto(uri);
                } else {
                    console.log('No image selected');
                }
            }
        });
    };

    const register = () => {
        // Perform the registration logic here
        navigation.navigate('LabelPreview', formData);
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData({...formData, [name]: value});
    };

    return (
        <View style={tw`flex-1 bg-gray-800 items-center justify-center p-5`}>
            <View style={tw`w-full`}>
                <Input
                    placeholder="Fornavn"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value => handleInputChange('fornavn', value)}
                />
                <Input
                    placeholder="Etternavn"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value =>
                        handleInputChange('etternavn', value)
                    }
                />
                <Input
                    placeholder="Tlf.nr"
                    keyboardType="phone-pad"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value => handleInputChange('Tlf.nr', value)}
                />
                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value => handleInputChange('E-mail', value)}
                />
                <Input
                    placeholder="Organisasjon"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value =>
                        handleInputChange('Organisasjon', value)
                    }
                />
                {photo && (
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        <Image source={{uri: photo}} style={tw`w-24 h-24`} />
                    </View>
                )}
                <Button
                    title={photo ? 'Ta bilde på nytt' : 'Ta bilde'}
                    onPress={takePhoto}
                    buttonStyle={tw`bg-blue-500`}
                    titleStyle={tw`text-white`}
                    type="outline"
                />
                <Button
                    title="Bekreft"
                    onPress={register}
                    buttonStyle={tw`bg-blue-500 mt-4`}
                    titleStyle={tw`text-white`}
                />
            </View>
        </View>
    );
}

export default Registration;
