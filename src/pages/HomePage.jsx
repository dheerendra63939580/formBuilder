import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 font-inter">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
                Welcome to the <span className="text-blue-600">Form Builder</span>
            </h1>
            <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl">
                Visually create custom forms with drag-and-drop, save templates, and manage user-filled data effortlessly.
            </p>
            <div className="flex space-x-6">
                <button
                    onClick={() => navigate('/create-template')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105"
                >
                    Create New Template
                </button>
                <button
                    onClick={() => navigate('/templates')}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-700 text-white font-bold text-xl rounded-full shadow-lg hover:from-purple-700 hover:to-pink-800 focus:outline-none focus:ring-4 focus:ring-purple-300 transition transform hover:scale-105"
                >
                    View All Templates
                </button>
            </div>
        </div>
    );
};

export default HomePage;