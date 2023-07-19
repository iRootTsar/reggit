import React from 'react';
import {Visitor} from 'clients/reggit-api/models/Visitor';
import VisitorRow from './VisitorRow';
import VisitorListHeader from './VisitorListHeader';

interface VisitorListProps {
    visits: Visitor[];
    searchTerm: string;
    onVisitorSelect: (visitor: Visitor) => void;
}

const VisitorList: React.FC<VisitorListProps> = ({
    visits,
    searchTerm,
    onVisitorSelect,
}) => (
    <div className="h-screen">
        <VisitorListHeader />
        <div className="overflow-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    {visits
                        .filter(visitor => {
                            const lowerTerm = searchTerm.toLowerCase();
                            return (
                                visitor.name
                                    ?.toLowerCase()
                                    .includes(lowerTerm) ||
                                visitor.email
                                    ?.toLowerCase()
                                    .includes(lowerTerm) ||
                                visitor.phone
                                    ?.toLowerCase()
                                    .includes(lowerTerm) ||
                                visitor.organization
                                    ?.toLowerCase()
                                    .includes(lowerTerm)
                            );
                        })
                        .map((visitor, index) => (
                            <VisitorRow
                                key={index}
                                visitor={visitor}
                                onClick={onVisitorSelect}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default VisitorList;
