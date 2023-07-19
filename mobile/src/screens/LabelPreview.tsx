import React from 'react';
import {View, Text, Button} from 'react-native';
import tw from 'tailwind-react-native-classnames';

function LabelPreviewScreen({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) {
    const {name, phone, email, organization} = route.params;

    return (
        <View style={tw`flex-1 bg-gray-800 items-center justify-center p-5`}>
            <Text style={tw`text-white text-center mb-5`}>Label preview</Text>
            <Text style={tw`text-white text-center mb-5`}>{name}</Text>
            <Text style={tw`text-white text-center mb-5`}>{phone}</Text>
            <Text style={tw`text-white text-center mb-5`}>{email}</Text>
            <Text style={tw`text-white text-center mb-5`}>{organization}</Text>
            <Button //returnere til å endre form
                title="Change info"
                onPress={() => navigation.goBack()}
            />
            <Button //Bekreft og send etikett til printing returnere til home
                title="Confirm and print"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default LabelPreviewScreen;
