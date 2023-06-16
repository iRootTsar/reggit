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
    const {fornavn, etternavn, tlfNr, email, organisasjon} = route.params;

    return (
        <View style={tw`flex-1 bg-gray-800 items-center justify-center p-5`}>
            <Text style={tw`text-white text-center mb-5`}>
                Navnelapp etikett
            </Text>
            <Text style={tw`text-white text-center mb-5`}>{fornavn}</Text>
            <Text style={tw`text-white text-center mb-5`}>{etternavn}</Text>
            <Text style={tw`text-white text-center mb-5`}>{tlfNr}</Text>
            <Text style={tw`text-white text-center mb-5`}>{email}</Text>
            <Text style={tw`text-white text-center mb-5`}>{organisasjon}</Text>
            <Button //returnere til å endre form
                title="Endre info"
                onPress={() => navigation.goBack()}
            />
            <Button //Bekreft og send etikett til printing returnere til home
                title="Bekreft og skriv ut navnelapp"
                onPress={() => navigation.navigate('Hjem')}
            />
        </View>
    );
}

export default LabelPreviewScreen;
