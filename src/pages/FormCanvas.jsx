// src/components/FormCanvas.js
import React from 'react';
import Section from './Section';

const FormCanvas = ({ sections, onAddField, onSelectField, onDeleteField, onSortEnd }) => {
    return (
        <div className="flex-grow p-8 bg-gray-100 rounded-lg shadow-inner border-2 border-dashed border-gray-300 min-h-[600px] overflow-auto">
            {sections.length === 0 ? (
                <p className="text-gray-500 text-lg text-center mt-20">Add sections to start building your form</p>
            ) : (
                sections.map(section => (
                    <Section
                        key={section.id}
                        section={section}
                        onAddField={onAddField}
                        onSelectField={onSelectField}
                        onDeleteField={onDeleteField}
                        onSortEnd={onSortEnd}
                    />
                ))
            )}
        </div>
    );
};

export default FormCanvas;
