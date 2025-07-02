// src/components/FieldItem.js
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const FieldItem = ({ field, onSelectField, onDeleteField }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-md border border-gray-200 hover:border-blue-400 transition duration-200 ease-in-out cursor-grab"
        >
            <div className="flex-grow" onClick={() => onSelectField(field)}>
                <p className="font-semibold text-gray-800">{field.label || `Untitled ${field.type}`}</p>
                <p className="text-sm text-gray-500">Type: {field.type}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onSelectField(field)}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Edit Field"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.586 3.586l-7.793 7.793V17h2.828l7.793-7.793-2.828-2.828z" />
                    </svg>
                </button>
                <button
                    onClick={() => onDeleteField(field.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                    title="Delete Field"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
                <button
                    {...attributes}
                    {...listeners}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Drag to reorder"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FieldItem;
