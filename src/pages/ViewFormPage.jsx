// src/pages/ViewFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormRenderer from './Renderer.jsx'; // Path is correct if FormRenderer.jsx is in src/

const ViewFormPage = () => {
    const { formId } = useParams();
    const navigate = useNavigate();
    const [formTemplate, setFormTemplate] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            try {
                const allSavedForms = JSON.parse(localStorage.getItem('savedForms')) || {};
                let foundFormData = null;
                let foundTemplate = null;

                // Iterate through all template's saved forms to find the specific formId
                for (const templateKey in allSavedForms) {
                    const formsForTemplate = allSavedForms[templateKey];
                    const form = formsForTemplate.find(f => f.id === formId);
                    if (form) {
                        foundFormData = form.data;
                        // Now find the associated template
                        const storedTemplates = JSON.parse(localStorage.getItem('formTemplates')) || [];
                        foundTemplate = storedTemplates.find(t => t.id === form.templateId);
                        break;
                    }
                }

                if (foundFormData && foundTemplate) {
                    setFormData(foundFormData);
                    setFormTemplate(foundTemplate);
                } else {
                    showMessage('Form data or associated template not found.', 'error');
                }
            } catch (error) {
                console.error("Error fetching form data/template from local storage:", error);
                showMessage('Error loading form.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [formId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-lg font-semibold text-gray-700">Loading form data...</div>
            </div>
        );
    }

    if (!formTemplate || !formData) {
        return (
            <div className="text-center text-red-500 text-lg p-8">
                {message || "Could not load form data."}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-inter">
            {message && (
                <div className={`p-3 mb-4 rounded-md text-center text-sm ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}
            <FormRenderer template={formTemplate} mode="view" initialData={formData} />
        </div>
    );
};

export default ViewFormPage;
