import React, {useState} from 'react';
import {View, Image, PermissionsAndroid, Platform} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {launchCamera, CameraOptions} from 'react-native-image-picker';
import tw from 'tailwind-react-native-classnames';
import {CreateVisitorDTO} from 'clients';

function Registration({navigation}: {navigation: any}) {
    const [photo, setPhoto] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
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

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'App Camera Permission',
                        message: 'App needs access to your camera',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    takePhoto();
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else if (Platform.OS === 'ios') {
            takePhoto();
        }
    };

    const register = () => {
        const dataToPass: CreateVisitorDTO = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            imageURL: photo,
        };

        // Navigate to 'LabelPreview' with dataToPass
        navigation.navigate('LabelPreview', dataToPass);
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData({...formData, [name]: value});
    };

    return (
        <View style={tw`flex-1 bg-gray-800 items-center justify-center p-5`}>
            <View style={tw`w-full`}>
                <Input
                    placeholder="Name"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value => handleInputChange('name', value)}
                />

                <Input
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value => handleInputChange('phone', value)}
                />
                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value => handleInputChange('email', value)}
                />
                <Input
                    placeholder="Organization"
                    inputStyle={tw`text-white`}
                    placeholderTextColor="gray"
                    onChangeText={value =>
                        handleInputChange('organization', value)
                    }
                />
                {photo && (
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        <Image source={{uri: photo}} style={tw`w-24 h-24`} />
                    </View>
                )}
                <Button
                    title={photo ? 'Take a new photo' : 'Take a photo'}
                    onPress={requestCameraPermission}
                    buttonStyle={tw`bg-blue-500`}
                    titleStyle={tw`text-white`}
                    type="outline"
                />
                <Button
                    title="Confirm"
                    onPress={register}
                    buttonStyle={tw`bg-blue-500 mt-4`}
                    titleStyle={tw`text-white`}
                />
            </View>
        </View>
    );
}

export default Registration;
