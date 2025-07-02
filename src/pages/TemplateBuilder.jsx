// src/pages/TemplateBuilder.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUniqueId } from '../utils/helper.js'; // Updated extension
import Modal from './Modal.jsx';
import FieldEditor from './FieldEditor.jsx';
import Sidebar from './Sidebar.jsx';
import FormCanvas from './FormCanvas.jsx';

const TemplateBuilder = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAddField = (type) => {
        const newField = {
            id: generateUniqueId(),
            type,
            label: '',
            placeholder: '',
            required: false,
            options: [],
        };
        setFields((prevFields) => [...prevFields, newField]);
        setSelectedField(newField);
        setIsEditorOpen(true);
    };

    const handleUpdateField = (updatedField) => {
        setFields((prevFields) =>
            prevFields.map((f) => (f.id === updatedField.id ? updatedField : f))
        );
        setSelectedField(null);
        setIsEditorOpen(false);
    };

    const handleDeleteField = (id) => {
        setFields((prevFields) => prevFields.filter((f) => f.id !== id));
        if (selectedField && selectedField.id === id) {
            setSelectedField(null);
            setIsEditorOpen(false);
        }
    };

    const handleSelectField = (field) => {
        setSelectedField(field);
        setIsEditorOpen(true);
    };

    const handleSortEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = [...items];
                const [movedItem] = newItems.splice(oldIndex, 1);
                newItems.splice(newIndex, 0, movedItem);
                return newItems;
            });
        }
    };

    const handleSaveTemplate = () => {
        if (!templateName.trim()) {
            showMessage('Template name cannot be empty!', 'error');
            return;
        }
        if (fields.length === 0) {
            showMessage('Please add at least one field to the form.', 'error');
            return;
        }

        try {
            const existingTemplates = JSON.parse(localStorage.getItem('formTemplates')) || [];
            const newTemplate = {
                id: generateUniqueId(), // Generate a unique ID for the template itself
                name: templateName,
                fields: fields,
                createdAt: new Date().toISOString(), // Use ISO string for timestamp
            };
            localStorage.setItem('formTemplates', JSON.stringify([...existingTemplates, newTemplate]));
            showMessage('Template saved successfully!', 'success');
            navigate('/templates'); // Navigate to templates list after saving
        } catch (e) {
            console.error("Error saving template to local storage: ", e);
            showMessage('Error saving template. Please try again.', 'error');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6 font-inter">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Form Template Builder</h1>

            {message && (
                <div className={`p-3 mb-4 rounded-md text-center text-sm ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <div className="flex-grow flex space-x-6">
                <Sidebar onAddField={handleAddField} />
                <div className="flex-grow flex flex-col bg-white rounded-lg shadow-xl p-6">
                    <div className="mb-6">
                        <label htmlFor="templateName" className="block text-lg font-medium text-gray-700 mb-2">Template Name</label>
                        <input
                            type="text"
                            id="templateName"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg"
                            placeholder="Enter template name"
                        />
                    </div>
                    <FormCanvas
                        fields={fields}
                        onSelectField={handleSelectField}
                        onDeleteField={handleDeleteField}
                        onDropField={handleAddField}
                        onSortEnd={handleSortEnd}
                    />
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSaveTemplate}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105"
                        >
                            Save Template
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} title="Edit Field Properties">
                {selectedField && (
                    <FieldEditor
                        field={selectedField}
                        onUpdateField={handleUpdateField}
                        onClose={() => setIsEditorOpen(false)}
                    />
                )}
            </Modal>
        </div>
    );
};

export default TemplateBuilder;
