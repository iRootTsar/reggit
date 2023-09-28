import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate , useLocation} from 'react-router-dom';

function Registration() {
     
    const location = useLocation();
    const navigate = useNavigate();
    const initialPhoto = sessionStorage.getItem('photo') || location.state?.photo;
    const initialFormDataFromRoute = JSON.parse(sessionStorage.getItem('formData') || '{}') || location.state?.formData;

    const [photo, setPhoto] = useState<string | null>(initialPhoto);

    useEffect(() => {
        if(location.state?.formData) {
            setFormData(location.state.formData);
        }
        if(location.state?.photo) {
            setPhoto(location.state.photo);
        }
    }, [location.state?.formData, location.state?.photo]);
    

    const [formData, setFormData] = useState(initialFormDataFromRoute || {
        name: '',
        email: '',
        phone: '',
        organization: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const register = () => {
        if (!formData.name || !formData.organization || !photo) {
            alert('Error: Photo, Name, and Organization are mandatory fields.');
            return;
        }
        console.log("Navigating with data:", { ...formData, image: photo });
        navigate('/labelpreview', { state: { ...formData, image: photo } });
    };
    

    return (
        <div className="flex flex-1 bg-gray-800 items-center justify-center h-screen px-5 overflow-y-auto">
            <div className="w-96 flex flex-col items-center space-y-4">
                <input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                    placeholder="Navn*"
                />
                <input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                    placeholder="Tlf.nr"
                />
                <input
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                    placeholder="E-mail"
                />
                <input
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                    placeholder="Organisasjon*"
                />
                <button
                    onClick={register}
                    className="bg-black py-4 rounded-md w-full text-center text-white font-medium text-2xl mt-4"
                >
                    Neste
                </button>
                <button
                    onClick={() => navigate('/photoscreen', { state: {formData } })}
                    className="bg-black py-4 rounded-md w-full text-center text-white font-medium text-2xl mt-4"
                >
                    Endre bilde
                </button>
            </div>
        </div>
    );
}

export default Registration;
