import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome';
import RegistrationScreen from './src/screens/Registration';
import LabelPreview from './src/screens/LabelPreview';
import PhotoScreen from './src/screens/PhotoScreen';
import {RegistrationProvider} from './src/contexts/RegistrationContext';
import {useState} from 'react';

type RootStackParamList = {
    Home: {message: string} | undefined;
    Photo: undefined;
    Registration: undefined;
    LabelPreview: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        photo: '',
    });
    return (
        //TO save state of registration fields, photo is within photscreen so must be null
        <RegistrationProvider value={{...formData, setFormData}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={WelcomeScreen}
                        options={({route}) => ({title: route.params?.message})}
                    />
                    <Stack.Screen name="Photo" component={PhotoScreen} />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                    />
                    <Stack.Screen
                        options={{title: 'Preview'}}
                        name="LabelPreview"
                        component={LabelPreview}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </RegistrationProvider>
    );
}

export default App;
