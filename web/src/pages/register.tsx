import React from 'react';
import {useNavigate} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-1 bg-gray-800 items-center justify-center h-screen px-5">
            <div className="flex flex-col items-center space-y-20">
                <img
                    src={require('../images/Miles_transparent.png')}
                    alt="Miles Logo"
                    className="w-64 h-15"
                />
                <p className="text-white font-medium text-4xl">
                    Welcome to Miles!
                </p>
                <button
                    className="bg-black py-4 rounded-md w-96 text-center text-white font-medium text-2xl"
                    onClick={() => navigate('/photoscreen')}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
