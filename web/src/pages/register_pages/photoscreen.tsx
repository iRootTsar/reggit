import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function PhotoScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<string | null>(location.state?.photo || null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const formDataFromParams = location.state?.formData || {};

    const initializeCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        const playPromise = videoRef.current.play();

                        // Ensure the play() method is supported
                        if (playPromise !== undefined) {
                            playPromise
                                .then(_ => {
                                    // Video playback started
                                })
                                .catch(error => {
                                    // Video playback failed
                                    console.error("Failed to start video playback:", error);
                                });
                        }
                    }
                })
                .catch(err => {
                    console.error('Error accessing camera:', err);
                });
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context?.drawImage(videoRef.current, 0, 0, 640, 480);
            const imageUrl = canvasRef.current.toDataURL('image/png');
            setPhoto(imageUrl);
        }
    };

    const retakePhoto = () => {
        setPhoto(null);
        initializeCamera();
    };

    // Inside PhotoScreen
    useEffect(() => {
        // Update the photo state when location.state.photo changes
        if(location.state?.photo) {
            setPhoto(location.state.photo);
        } else {
            initializeCamera();
        }
    }, [location.state?.photo]);

    const handleNext = () => {
        if (photo) {
            sessionStorage.setItem('photo', photo);
            sessionStorage.setItem('formData', JSON.stringify(formDataFromParams));
            navigate('/registration', {
                state: { photo, formData: formDataFromParams }
            });
        }
    };

    return (
        <div className="flex flex-1 bg-gray-800 items-center justify-center h-screen px-5">
            <div className="flex flex-col items-center space-y-10">
                {photo ? (
                    <div className="flex flex-col items-center">
                        <img
                            src={photo}
                            alt="Captured"
                            className="w-auto h-480 mb-5 border rounded-md"
                        />
                        <button
                            onClick={retakePhoto}
                            className="bg-black py-4 rounded-md w-96 text-center text-white font-medium text-2xl"
                        >
                            Ta bilde på nytt
                        </button>
                    </div>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            width="640"
                            height="480"
                            autoPlay
                            className="border rounded-md mb-4"
                            onError={(e) => console.error('Video error:', e)}
                        ></video>
                        <button
                            onClick={capturePhoto}
                            className="bg-black py-4 rounded-md w-96 text-center text-white font-medium text-2xl"
                        >
                            Ta bilde
                        </button>
                    </>
                )}

                {photo && (
                    <button
                        className="bg-black py-4 rounded-md w-96 text-center text-white font-medium text-2xl"
                        onClick={handleNext}
                    >
                        Neste
                    </button>
                )}
                <button
                    className="bg-black py-4 rounded-md w-96 text-center text-white font-medium text-2xl mt-10"
                    onClick={() =>
                        navigate('/registration', {
                            state: { photo, formData: formDataFromParams }
                        })
                    }
                >
                    Hopp over
                </button>
            </div>
            <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
        </div>
    );

}

export default PhotoScreen;
