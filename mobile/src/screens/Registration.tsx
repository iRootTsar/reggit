import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TextInput,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Input, Button} from 'react-native-elements';

function Registration({route, navigation}: {navigation: any; route: any}) {
    const initialPhoto = route.params?.photo;
    const initialFormDataFromRoute = route.params?.formData;
    const [focused, setFocused] = useState<string | null>(null);

    //UseStae initail form
    const [formData, setFormData] = useState(
        initialFormDataFromRoute || {
            name: '',
            email: '',
            phone: '',
            organization: '',
        }
    );

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const register = () => {
        if (!formData.name || !formData.organization || !initialPhoto) {
            Alert.alert(
                'Error',
                'Photo, Name, and Organization are mandatory fields.'
            );
            return;
        }
        navigation.navigate('LabelPreview', {...formData, image: initialPhoto});
    };

    //Here i try to fix the focus on field keyboard problem on Android
    const nameRef = useRef<TextInput | null>(null);
    const phoneRef = useRef<TextInput | null>(null);
    const emailRef = useRef<TextInput | null>(null);
    const organizationRef = useRef<TextInput | null>(null);

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            handleKeyboardDidHide
        );

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleKeyboardDidHide = () => {
        nameRef.current && nameRef.current.blur(); //dont know hwy it shows that here is error but code works only with blur on
        phoneRef.current && phoneRef.current.blur();
        emailRef.current && emailRef.current.blur();
        organizationRef.current && organizationRef.current.blur();
    };

    return (
        <KeyboardAvoidingView
            style={tw`flex-1 bg-gray-800`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                style={tw`flex-1`}
                contentContainerStyle={tw`flex-grow justify-center`}>
                <View
                    style={tw`flex-1 bg-gray-800 items-center justify-center p-5`}>
                    <View style={tw`w-96`}>
                        <Input
                            ref={nameRef} //need this to avoid field focus when no keyboard is present on Android
                            value={formData.name} //Saved state if we wanan jump from oen window to anotehr
                            label="Name*"
                            labelStyle={[
                                tw`absolute left-2`,
                                focused === 'name' || formData.name
                                    ? tw`text-xs top-0`
                                    : tw`text-base top-1/3`,
                                focused === 'name'
                                    ? tw`text-white`
                                    : tw`text-gray-500`,
                            ]}
                            inputContainerStyle={tw`mt-4`}
                            inputStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                            placeholderTextColor="gray"
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            onChangeText={value =>
                                handleInputChange('name', value)
                            }
                        />

                        <Input
                            ref={phoneRef}
                            value={formData.phone}
                            label="Phone"
                            labelStyle={[
                                tw`absolute left-2`,
                                focused === 'phone' || formData.phone
                                    ? tw`text-xs top-0`
                                    : tw`text-base top-1/3`,
                                focused === 'phone'
                                    ? tw`text-white`
                                    : tw`text-gray-500`,
                            ]}
                            keyboardType="numeric"
                            inputContainerStyle={tw`mt-4`}
                            inputStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                            placeholderTextColor="gray"
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused(null)}
                            onChangeText={value =>
                                handleInputChange('phone', value)
                            }
                        />
                        <Input
                            ref={emailRef}
                            value={formData.email}
                            label="E-mail"
                            labelStyle={[
                                tw`absolute left-2`,
                                focused === 'E-mail' || formData.email
                                    ? tw`text-xs top-0`
                                    : tw`text-base top-1/3`,
                                focused === 'E-mail'
                                    ? tw`text-white`
                                    : tw`text-gray-500`,
                            ]}
                            inputContainerStyle={tw`mt-4`}
                            inputStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                            placeholderTextColor="gray"
                            onFocus={() => setFocused('E-mail')}
                            onBlur={() => setFocused(null)}
                            onChangeText={value =>
                                handleInputChange('E-mail', value)
                            }
                        />
                        <Input
                            ref={organizationRef}
                            value={formData.organization}
                            label="Organization*"
                            labelStyle={[
                                tw`absolute left-2`,
                                focused === 'organization' ||
                                formData.organization
                                    ? tw`text-xs top-0`
                                    : tw`text-base top-1/3`,
                                focused === 'organization'
                                    ? tw`text-white`
                                    : tw`text-gray-500`,
                            ]}
                            inputContainerStyle={tw`mt-4`}
                            inputStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                            placeholderTextColor="gray"
                            onFocus={() => setFocused('organization')}
                            onBlur={() => setFocused(null)}
                            onChangeText={value =>
                                handleInputChange('organization', value)
                            }
                        />
                        <View style={tw`mt-4`} />
                        <Button
                            title="Next"
                            onPress={register}
                            buttonStyle={tw`bg-black py-4 rounded-md w-full`}
                            titleStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                        />
                        <View style={tw`mt-4`} />
                        <Button
                            title="Change picture"
                            onPress={() =>
                                navigation.navigate('Photo', {formData})
                            }
                            buttonStyle={tw`bg-black py-4 mb-4 rounded-md w-full`}
                            titleStyle={[
                                tw`text-white text-center`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Registration;
