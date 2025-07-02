// src/FormRenderer.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormRenderer = ({ template, mode, initialData = {}, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'edit' || mode === 'view') {
            setFormData(initialData);
        } else {
            setFormData({}); // Clear form data for create mode
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
                    ? [...(prev[name] || []), value]
                    : (prev[name] || []).filter(item => item !== value)
            }));
        } else if (type === 'radio') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        // Clear error for this field when it changes
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const validateForm = () => {
        const newErrors = {};
        template.fields.forEach(field => {
            if (field.required) {
                if (field.type === 'checkbox') {
                    if (!formData[field.id] || formData[field.id].length === 0) {
                        newErrors[field.id] = `${field.label || 'This field'} is required.`;
                    }
                } else if (!formData[field.id] || String(formData[field.id]).trim() === '') {
                    newErrors[field.id] = `${field.label || 'This field'} is required.`;
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'view') return; // No submission in view mode

        if (validateForm()) {
            onSubmit(formData);
        } else {
            console.log("Form validation failed", errors);
        }
    };

    if (!template || !template.fields) {
        return <div className="text-center text-gray-500 text-lg p-8">Loading form template...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl my-8 font-inter">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                {mode === 'create' ? 'Fill Form' : mode === 'edit' ? 'Edit Form' : 'View Form'}
            </h2>
            <p className="text-xl font-semibold text-gray-700 mb-8 text-center">{template.name}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {template.fields.map((field) => (
                    <div key={field.id} className="mb-4">
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'input' && (
                            <input
                                type="text"
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className={`mt-1 block w-full rounded-md border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                                readOnly={mode === 'view'}
                            />
                        )}
                        {field.type === 'textarea' && (
                            <textarea
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                rows="4"
                                className={`mt-1 block w-full rounded-md border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2`}
                                readOnly={mode === 'view'}
                            ></textarea>
                        )}
                        {field.type === 'select' && (
                            <select
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-white`}
                                disabled={mode === 'view'}
                            >
                                <option value="">Select an option</option>
                                {field.options && field.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                        {field.type === 'checkbox' && (
                            <div className="mt-2 space-y-2">
                                {field.options && field.options.map((option, index) => (
                                    <label key={index} className="flex items-center text-gray-700">
                                        <input
                                            type="checkbox"
                                            name={field.id}
                                            value={option}
                                            checked={(formData[field.id] || []).includes(option)}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                                            disabled={mode === 'view'}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                        {field.type === 'radio' && (
                            <div className="mt-2 space-y-2">
                                {field.options && field.options.map((option, index) => (
                                    <label key={index} className="flex items-center text-gray-700">
                                        <input
                                            type="radio"
                                            name={field.id}
                                            value={option}
                                            checked={formData[field.id] === option}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-2"
                                            disabled={mode === 'view'}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                        {field.type === 'resident-dropdown' && (
                            <select
                                id={field.id}
                                name={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-white`}
                                disabled={mode === 'view'}
                            >
                                <option value="">Select an option</option>
                                {field.options && field.options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        )}
                        {errors[field.id] && (
                            <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
                        )}
                    </div>
                ))}

                {mode !== 'view' && (
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
                        >
                            {mode === 'create' ? 'Submit Form' : 'Save Changes'}
                        </button>
                    </div>
                )}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormRenderer;
