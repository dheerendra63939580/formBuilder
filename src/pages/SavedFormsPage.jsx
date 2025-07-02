// src/pages/SavedFormsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SavedFormsPage = () => {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const [savedForms, setSavedForms] = useState([]);
    const [templateName, setTemplateName] = useState('');
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
            const foundTemplate = storedTemplates.find(t => t.id === templateId);
            if (foundTemplate) {
                setTemplateName(foundTemplate.name);
            } else {
                setTemplateName('Unknown Template');
            }

            const allSavedForms = JSON.parse(localStorage.getItem('savedForms')) || {};
            const formsForTemplate = allSavedForms[templateId] || [];
            setSavedForms(formsForTemplate);
        } catch (error) {
            console.error("Error loading saved forms from local storage:", error);
            showMessage('Error loading saved forms.', 'error');
        } finally {
            setLoading(false);
        }
    }, [templateId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-lg font-semibold text-gray-700">Loading saved forms...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-inter">
           <button
                onClick={() => navigate(`/fill-form/${templateId}`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
                Fill a New Form
            </button>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Saved Forms for "{templateName}"</h1>
            {message && (
                <div className={`p-3 mb-4 rounded-md text-center text-sm ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            {savedForms.length === 0 ? (
                <div className="text-center text-gray-600 text-lg mt-12">
                    <p className="mb-4">No forms saved for this template yet.</p>
                    <button
                        onClick={() => navigate(`/fill-form/${templateId}`)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                    >
                        Fill a New Form
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Form ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submitted At
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {savedForms.map((form) => (
                                <tr key={form.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {form.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {form.submittedAt ? new Date(form.submittedAt).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex justify-center space-x-3">
                                            <button
                                                onClick={() => navigate(`/view-form/${form.id}`)}
                                                className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md border border-green-600 hover:bg-green-50 transition-colors"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => navigate(`/edit-form/${form.id}`)}
                                                className="text-yellow-600 hover:text-yellow-900 px-3 py-1 rounded-md border border-yellow-600 hover:bg-yellow-50 transition-colors"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={() => navigate(`/`)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                >
                    Back to Templates
                </button>
            </div>
        </div>
    );
};

export default SavedFormsPage;
