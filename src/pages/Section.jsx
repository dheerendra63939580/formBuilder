// src/components/Section.jsx
import React from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    KeyboardSensor,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import FieldItem from './FieldItem';

const Section = ({ section, onAddField, onSelectField, onDeleteField, onSortEnd }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDrop = (event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('field-type');
        if (type) {
            onAddField(type, section.id);
        }
    };

    return (
        <div
            className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{section.name}</h2>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => onSortEnd(section.id, event)}>
                <SortableContext items={section.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div
                        className={`grid gap-4 grid-cols-${section.columns.sm} sm:grid-cols-${section.columns.sm} md:grid-cols-${section.columns.md} lg:grid-cols-${section.columns.lg}`}
                    >
                        {section.fields.map((field) => (
                            <FieldItem
                                key={field.id}
                                field={field}
                                onSelectField={() => onSelectField(field, section.id)}
                                onDeleteField={() => onDeleteField(field.id, section.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Section;
