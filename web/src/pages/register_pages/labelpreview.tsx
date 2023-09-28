import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; 
import axios from 'axios';
import {CreateVisitorDTO} from 'clients';

function LabelPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const [photo] = useState<string | null>(location.state?.photo || null);
    const formDataFrom = JSON.parse(sessionStorage.getItem('formData') || '{}') || location.state?.formData;
    console.log("Data in LabelPreview:", location.state?.formData);
    
    const handleNext = () => {
        sessionStorage.setItem('photo', image);
        sessionStorage.setItem('formData', JSON.stringify(formDataFrom));
        navigate('/registration', {
            state: { photo, formData: formDataFrom }
        });
    };

    const { name, phone, email, organization, image } = location.state;

    const confirmAndPrint = async () => {
        const requestBody: CreateVisitorDTO = {
            name,
            email,
            phone,
            organization,
            image,
        };

        try {
            // If the printing request was successful, add the person to the database
            await axios.put('/Visit', requestBody);

            // Print request and database update completed
            navigate('Home');
        } catch (error) {
            console.error('Printing error:', error);
            // Handle the error here (e.g., show an error message to the user)
        }
    };


    return (
        <div className="flex flex-1 bg-gray-800 flex-col items-center p-8">
            <h2 className="text-white font-bold mt-10 mb-5 text-2xl">Registrert Informasjon</h2>
            <div className="mb-5 flex">
                <div className="w-1/2 text-white">
                    <p><strong>Navn:</strong> <span className="inline-block">{name}</span></p>
                    <p><strong>Tlf.nr:</strong> <span className="inline-block">{phone}</span></p>
                    <p><strong>E-mail:</strong> <span className="inline-block">{email}</span></p>
                    <p><strong>Organisasjon:</strong> <span className="inline-block">{organization}</span></p>
                </div>
                <div className="w-1/2">
                    <img src={image} alt="User" width="200" height="200" className="float-right" />
                </div>
            </div>
            <h2 className="text-white font-bold mt-10 mb-5 text-2xl">Label Preview</h2>
            <div className="w-96 label mb-10 bg-white text-center p-2 rounded">
                <h3 className="text-black text-xl mb-1">{name}</h3>
                <h3 className="text-black text-xl mb-1">{organization}</h3>
            </div>
            <div className="w-96">
                <button
                className="bg-black py-4 mb-4 rounded-md w-full text-white font-medium text-2xl"
                onClick={handleNext}
                    >
                    Endre informasjon
                </button>
                <button onClick={confirmAndPrint} className="bg-black py-4 rounded-md w-full text-white font-medium text-2xl">Print navnelapp</button>
            </div>
        </div>
    );
}

export default LabelPreview;
