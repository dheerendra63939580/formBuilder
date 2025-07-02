// src/pages/TemplatesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplatesPage = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    useEffect(() => {
        try {
            const storedTemplates = JSON.parse(localStorage.getItem('formTemplates')) || [];
            setTemplates(storedTemplates);
        } catch (error) {
            console.error("Error loading templates from local storage:", error);
            showMessage('Error loading templates.', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-lg font-semibold text-gray-700">Loading templates...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-inter">
            <button
                onClick={() => navigate(`/create-template`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
                Create New Template
            </button>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Form Templates</h1>

            {message && (
                <div className={`p-3 mb-4 rounded-md text-center text-sm ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            {templates.length === 0 ? (
                <div className="text-center text-gray-600 text-lg mt-12">
                    <p className="mb-4">No templates created yet.</p>
                    <button
                        onClick={() => navigate('/create-template')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                    >
                        Create Your First Template
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg p-6 flex gap-2.5">
                    {/* <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Template Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {templates.map((template) => (
                                <tr key={template.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {template.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {template.createdAt ? new Date(template.createdAt).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex justify-center space-x-3">
                                            <button
                                                onClick={() => navigate(`/fill-form/${template.id}`)}
                                                className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                Fill Form
                                            </button>
                                            <button
                                                onClick={() => navigate(`/saved-forms/${template.id}`)}
                                                className="text-purple-600 hover:text-purple-900 px-3 py-1 rounded-md border border-purple-600 hover:bg-purple-50 transition-colors"
                                            >
                                                View Saved Forms
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>                      
                    </table> */}
                    {templates.map((template) => (
                        <div 
                            key={template.id} 
                            className='p-10 text-3xl shadow-md rounded-md cursor-pointer'
                            onClick={() => navigate(`/saved-forms/${template.id}`)}
                        >
                            <h1>{template.name}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TemplatesPage;
