// src/components/FormCanvas.js
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FieldItem from './FieldItem';

const FormCanvas = ({ fields, onSelectField, onDeleteField, onDropField, onSortEnd }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const fieldType = event.dataTransfer.getData('field-type');
        if (fieldType) {
            onDropField(fieldType);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onSortEnd}
        >
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="flex-grow p-8 bg-gray-100 rounded-lg shadow-inner border-2 border-dashed border-gray-300 min-h-[600px] flex flex-col items-center justify-center relative"
            >
                {fields.length === 0 && (
                    <p className="text-gray-500 text-lg">Drag & Drop fields here to build your form</p>
                )}
                <div className="w-full max-w-2xl">
                    <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field) => (
                            <FieldItem
                                key={field.id}
                                field={field}
                                onSelectField={onSelectField}
                                onDeleteField={onDeleteField}
                            />
                        ))}
                    </SortableContext>
                </div>
            </div>
        </DndContext>
    );
};

export default FormCanvas;
