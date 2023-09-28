import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TextInput,
    Text,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Input, Button} from 'react-native-elements';

function Registration({route, navigation}: {navigation: any; route: any}) {
    const initialPhoto = route.params?.photo;
    const initialFormDataFromRoute = route.params?.formData;
    const [focused, setFocused] = useState<string | null>(null);

    // UseState initial form
    const [formData, setFormData] = useState(
        initialFormDataFromRoute || {
            name: '',
            email: '',
            phone: '',
            organization: '',
        }
    );

    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
    });

    //Handle input changes in real time for smooth user experience
    const handleInputChange = (name: string, value: string) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));

        // Validate in real-time
        const errors: any = {...fieldErrors};

        if (name === 'name') {
            if (!/^[a-zA-Z\s-]*$/.test(value)) {
                errors.name = 'Kun inneholde bokstav, bindestrek og mellomrom';
            } else if (value.length > 20) {
                errors.name = 'Navn må være 20 tegn eller mindre';
            } else {
                errors.name = '';
            }
        }

        if (name === 'phone') {
            if (!/^\d{0,8}$/.test(value)) {
                errors.phone = 'Telefonnummer kan innehodle opp til 8 siffer';
            } else {
                errors.phone = '';
            }
        }

        if (name === 'email') {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors.email = 'Ugyldig e-postformat';
            } else {
                errors.email = '';
            }
        }

        if (name === 'organization') {
            errors.organization = '';
        }

        setFieldErrors(errors);
    };

    // Upon clickign next to jump to labelpreview screen
    const register = () => {
        const errors: any = {};

        // Validation check
        if (!formData.name) {
            errors.name = '*Obligatorisk felt';
        }

        if (!formData.organization) {
            errors.organization = '*Obligatorisk felt';
        }

        if (!/^[a-zA-Z\s-]*$/.test(formData.name)) {
            errors.name =
                'Navn kan kun inneholde bokstav, bindestrek og mellomrom';
        } else if (formData.name.length > 20) {
            errors.name = 'Navn må være 20 tegn elelr mindre';
        }

        if (formData.phone && !/^\d{0,8}$/.test(formData.phone)) {
            errors.phone = 'Telefonnummer kan innehodle opp til 8 siffer';
        }

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            errors.email = 'Invalid email format.';
        }

        setFieldErrors(errors);

        // Check if there are any errors
        if (Object.keys(errors).length === 0) {
            navigation.navigate('LabelPreview', {
                ...formData,
                image: initialPhoto,
            });
        }
    };

    // Here i try to fix the focus on field keyboard problem on Android
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
        nameRef.current && nameRef.current.blur();
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
                            ref={nameRef}
                            value={formData.name}
                            label="Navn*"
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
                        {fieldErrors.name && (
                            <Text style={tw`text-red-500 text-xs mt-1`}>
                                {fieldErrors.name}
                            </Text>
                        )}

                        <Input
                            ref={phoneRef}
                            value={formData.phone}
                            label="Tlf.nr"
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
                        {fieldErrors.phone && (
                            <Text style={tw`text-red-500 text-xs mt-1`}>
                                {fieldErrors.phone}
                            </Text>
                        )}

                        <Input
                            ref={emailRef}
                            value={formData.email}
                            label="E-mail"
                            labelStyle={[
                                tw`absolute left-2`,
                                focused === 'email' || formData.email
                                    ? tw`text-xs top-0`
                                    : tw`text-base top-1/3`,
                                focused === 'email'
                                    ? tw`text-white`
                                    : tw`text-gray-500`,
                            ]}
                            inputContainerStyle={tw`mt-4`}
                            inputStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                            placeholderTextColor="gray"
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            onChangeText={value =>
                                handleInputChange('email', value)
                            }
                        />
                        {fieldErrors.email && (
                            <Text style={tw`text-red-500 text-xs mt-1`}>
                                {fieldErrors.email}
                            </Text>
                        )}

                        <Input
                            ref={organizationRef}
                            value={formData.organization}
                            label="Organisasjon*"
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
                        {fieldErrors.organization && (
                            <Text style={tw`text-red-500 text-xs mt-1`}>
                                {fieldErrors.organization}
                            </Text>
                        )}

                        <View style={tw`mt-4`} />
                        <Button
                            title="Neste"
                            onPress={register}
                            buttonStyle={tw`bg-black py-4 rounded-md w-full`}
                            titleStyle={[
                                tw`text-white`,
                                {fontFamily: 'CircularStd-Medium'},
                            ]}
                        />
                        <View style={tw`mt-4`} />
                        <Button
                            title="Ta bilde på nytt"
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
