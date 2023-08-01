import React, {useEffect, useState} from 'react';
import {Visitor} from 'clients/reggit-api/models/Visitor';

interface VisitorRowProps {
    visitor: Visitor;
    onClick: (visitor: Visitor) => void;
    selected: boolean;
    toggleSelection: () => void;
}

const VisitorRow: React.FC<VisitorRowProps> = ({
    visitor,
    onClick,
    selected,
    toggleSelection,
}) => {
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        const registeredDate = new Date(visitor.registeredAt!);
        const daysSinceRegistration =
            (new Date().getTime() - registeredDate.getTime()) /
            (1000 * 60 * 60 * 24);
        setIsOverdue(daysSinceRegistration > 0.01); //Change to amount of days before overdue
    }, [visitor]);

    return (
        <tr
            className={`px-6 py-4 ${'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>
            <td className="px-2 py-4" onClick={() => onClick(visitor)}>
                <img
                    src={`data:image/png;base64, ${visitor.image || ''}`}
                    alt={visitor.name || ''}
                    className="w-12 h-12 object-cover rounded-full"
                />
            </td>
            <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                onClick={() => onClick(visitor)}>
                {visitor.name}
            </td>
            <td className="px-6 py-4" onClick={() => onClick(visitor)}>
                {visitor.email}
            </td>
            <td className="px-6 py-4" onClick={() => onClick(visitor)}>
                {visitor.phone}
            </td>
            <td className="px-6 py-4" onClick={() => onClick(visitor)}>
                {visitor.organization}
            </td>
            <td className="px-6 py-4">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={toggleSelection}
                />
                <span style={{marginRight: '20px'}} />
                {isOverdue && '⌛️'}
            </td>
        </tr>
    );
};

export default VisitorRow;
