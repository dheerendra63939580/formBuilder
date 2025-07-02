// src/components/SectionEditor.jsx
import React, { useState } from 'react';

const SectionEditor = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [columns, setColumns] = useState({ sm: 1, md: 2, lg: 3 });

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSubmit({ name, columns });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Section Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {['sm', 'md', 'lg'].map((size) => (
                    <div key={size}>
                        <label className="block text-sm font-medium">Columns ({size})</label>
                        <input
                            type="number"
                            min={1}
                            max={6}
                            value={columns[size]}
                            onChange={(e) => setColumns({ ...columns, [size]: parseInt(e.target.value) })}
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end space-x-4">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Add Section</button>
            </div>
        </div>
    );
};

export default SectionEditor;
