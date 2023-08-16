import React, {useState} from 'react';
import {View, Image} from 'react-native';
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
        };
        launchCamera(options, response => {
            if (!response.didCancel && !response.errorCode && response.assets) {
                setPhoto(response.assets[0]?.base64 || null);
            }
        });
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
                onPress={takePhoto}
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
        </View>
    );
}

export default PhotoScreen;
