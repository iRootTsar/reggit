import React from 'react';
import {Visitor} from '../../clients/reggit-api/models/Visitor';

interface VisitorRowProps {
    visitor: Visitor;
    onClick: (visitor: Visitor) => void;
}

const VisitorRow: React.FC<VisitorRowProps> = ({visitor, onClick}) => (
    <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        onClick={() => onClick(visitor)}>
        <td className=" px-2 py-4">
            <img
                src={visitor.imageURL || ''}
                alt={visitor.name || ''}
                className="w-12 h-12 object-cover rounded-full"
            />
        </td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {visitor.name}
        </td>
        <td className="px-6 py-4">{visitor.email}</td>
        <td className="px-6 py-4">{visitor.phone}</td>
        <td className="px-6 py-4">{visitor.organization}</td>
    </tr>
);

export default VisitorRow;
