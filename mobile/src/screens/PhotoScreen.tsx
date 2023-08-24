import React, {useState} from 'react';
import {View, Image, PermissionsAndroid, Platform} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Button} from 'react-native-elements';
import {launchCamera, CameraOptions} from 'react-native-image-picker';

function PhotoScreen({navigation, route}: {navigation: any; route: any}) {
    const [photo, setPhoto] = useState<string | null>(null);
    const formDataFromParams = route.params?.formData;
    const takePhoto = () => {
        let options: CameraOptions = {
            mediaType: 'photo',
            includeBase64: true,
            cameraType: 'front',
        };
        launchCamera(options, response => {
            if (!response.didCancel && !response.errorCode && response.assets) {
                setPhoto(response.assets[0]?.base64 || null);
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

    return (
        <View style={tw`flex-1 bg-gray-800 items-center justify-center p-5`}>
            {photo && (
                <Image
                    source={{uri: `data:image/png;base64,${photo}`}}
                    style={{width: 300, height: 300, marginBottom: 20}}
                />
            )}
            <Button
                title={photo ? 'Retake Photo' : 'Take Photo'}
                onPress={requestCameraPermission}
                buttonStyle={tw`bg-black py-4 rounded-md w-96`}
                titleStyle={tw`text-white`}
            />
            {photo && (
                <View style={tw`mt-4`}>
                    <Button
                        title="Next"
                        onPress={() =>
                            //Ikke gå videre
                            navigation.navigate('Registration', {
                                photo,
                                formData: formDataFromParams,
                            })
                        }
                        buttonStyle={tw`bg-black py-4 rounded-md w-96`}
                        titleStyle={tw`text-white`}
                    />
                </View>
            )}
            <Button
                title="Skip"
                onPress={() =>
                    navigation.navigate('Registration', {
                        photo: null,
                        formData: formDataFromParams,
                    })
                }
                buttonStyle={tw`bg-black py-4 rounded-md w-96 mt-10`}
                titleStyle={tw`text-white`}
            />
        </View>
    );
}

export default PhotoScreen;
