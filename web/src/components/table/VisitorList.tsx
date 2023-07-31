import React, {useState} from 'react';
import {Visitor} from 'clients/reggit-api/models/Visitor';
import VisitorRow from './VisitorRow';
import {AiFillDelete} from 'react-icons/ai'; // Import the trash icon from react-icons
import {VisitService} from 'clients/reggit-api/dist/services/VisitService';

interface VisitorListProps {
    visits: Visitor[];
    searchTerm: string;
    onVisitorSelect: (visitor: Visitor) => void;
    refreshTable: () => void;
}

const VisitorList: React.FC<VisitorListProps> = ({
    visits,
    searchTerm,
    onVisitorSelect,
    refreshTable,
}) => {
    const [selectedVisitors, setSelectedVisitors] = useState<Visitor[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const toggleSelection = (visitor: Visitor) => {
        if (selectedVisitors.includes(visitor)) {
            setSelectedVisitors(selectedVisitors.filter(v => v !== visitor));
        } else {
            setSelectedVisitors([...selectedVisitors, visitor]);
        }
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedVisitors([]);
        } else {
            setSelectedVisitors(visits);
        }
        setSelectAll(!selectAll);
    };

    const deleteSelected = () => {
        const ids = selectedVisitors.map(visitor => visitor.id!);

        if (
            window.confirm(
                'Are you sure you want to delete the selected visitors?'
            )
        ) {
            VisitService.deleteVisitors(ids)
                .then(response => {
                    console.log(response);
                    refreshTable();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="h-[calc(100vh-105px)] overflow-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                            scope="col"
                            className="px-6 py-3 sticky top-0 bg-gray-800">
                            Picture
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 sticky top-0 bg-gray-800">
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 sticky top-0 bg-gray-800">
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 sticky top-0 bg-gray-800">
                            Phone
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 sticky top-0 bg-gray-800">
                            Organization
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 sticky top-0 bg-gray-800">
                            <div
                                style={{display: 'flex', alignItems: 'center'}}>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={toggleSelectAll}
                                />
                                <AiFillDelete
                                    onClick={deleteSelected}
                                    style={{
                                        marginLeft: '20px',
                                        cursor: 'pointer',
                                    }}
                                    size={20}
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
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
                                selected={selectedVisitors.includes(visitor)}
                                toggleSelection={() => toggleSelection(visitor)}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorList;
