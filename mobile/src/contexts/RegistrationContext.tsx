// RegistrationContext.tsx
import React from 'react';

type RegistrationData = {
    name: string;
    email: string;
    phone: string;
    organization: string;
    photo: string;
    setFormData: React.Dispatch<
        React.SetStateAction<{
            name: string;
            email: string;
            phone: string;
            organization: string;
            photo: string;
        }>
    >;
};

const defaultState: RegistrationData = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    photo: '',
    setFormData: () => {}, // empty function as placeholder
};

const RegistrationContext = React.createContext(defaultState);

export const RegistrationProvider = RegistrationContext.Provider;
export const RegistrationConsumer = RegistrationContext.Consumer;
export default RegistrationContext;
