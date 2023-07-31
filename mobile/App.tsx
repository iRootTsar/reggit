import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome';
import RegistrationScreen from './src/screens/Registration';
import LabelPreview from './src/screens/LabelPreview';

type RootStackParamList = {
    Home: {message: string} | undefined;
    Registration: undefined;
    LabelPreview: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={WelcomeScreen}
                    options={({route}) => ({title: route.params?.message})}
                />
                <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                />
                <Stack.Screen name="LabelPreview" component={LabelPreview} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
