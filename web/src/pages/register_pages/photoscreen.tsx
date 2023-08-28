import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function PhotoScreen() {
    // const navigate = useNavigate();
    // const {params} = useLocation();
    // const [photo, setPhoto] = useState(null);
    // const formDataFromParams = route.params?.formData;

    // const handleImageChange = e => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPhoto(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <div className="flex flex-1 bg-gray-800 items-center justify-center p-5">
            {/* {photo && (
                <img
                    src={photo}
                    alt="Captured"
                    className="w-72 h-72 mb-5" // equivalent to width: 300, height: 300, marginBottom: 20
                />
            )}
            <label className="bg-black py-4 rounded-md w-96 text-center text-white cursor-pointer">
                {photo ? 'Retake Photo' : 'Take Photo'}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </label>
            {photo && (
                <button
                    onClick={() =>
                        navigate('/Registration', {
                            photo,
                            formData: formDataFromParams,
                        })
                    }
                    className="bg-black py-4 rounded-md w-96 text-center text-white mt-4">
                    Next
                </button>
            )}
            <button
                onClick={() =>
                    navigate('/Registration', {
                        photo: null,
                        formData: formDataFromParams,
                    })
                }
                className="bg-black py-4 rounded-md w-96 text-center text-white mt-10">
                Skip
            </button> */}
        </div>
    );
}

export default PhotoScreen;
