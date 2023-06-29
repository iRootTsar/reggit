import React, {useEffect, useState} from 'react';
import {VisitService} from '../clients/reggit-api/index';
import {Visitor} from '../clients/reggit-api/models/Visitor';
//import Sidebar from 'src/components/sidebar';
import PopoutModal from 'src/components/popoutmodal';

const Home: React.FC = () => {
    const [visits, setVisits] = useState([] as Visitor[]);

    // create hook for loading visits
    const getVisits = async () => {
        // setLoading(true);
        VisitService.getVisitors()
            .then(response => {
                setVisits(response);
                //   setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Search field
    const [searchTerm, setSearchTerm] = useState('');

    // Selected visitor
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor>();

    // Sidebar
    //const [sidebarOpen, setSidebarOpen] = useState(false);

    // Popout modal
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getVisits();
    }, []);

    // Function for refreshing table
    const fetchVisitorsAgain = () => {
        getVisits();
    };

    return (
        <div className="flex flex-col">
            <div className=" bg-gray-700 p-4 sticky top-16 z-30">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                />
            </div>
            <div className="overflow-auto h-[69.5rem]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 z-10 w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            onClick={() => setSelectedVisitor(selectedVisitor)}>
                            <th scope="col" className="px-6 py-3">
                                Picture
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Organization
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
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    onClick={() => {
                                        setSelectedVisitor(visitor);
                                        //setSidebarOpen(true);
                                        setModalOpen(true);
                                    }}>
                                    <td className=" px-2 py-4">
                                        <img
                                            src={
                                                visitor.imageURL
                                                    ? visitor.imageURL
                                                    : ''
                                            }
                                            alt={
                                                visitor.name ? visitor.name : ''
                                            }
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {visitor.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visitor.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visitor.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visitor.organization}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <PopoutModal
                    //open={sidebarOpen}
                    //setOpen={setSidebarOpen}
                    open={modalOpen}
                    setOpen={setModalOpen}
                    selectedVisitor={selectedVisitor}
                    refreshTable={fetchVisitorsAgain}
                />
            </div>
        </div>
    );
};

export default Home;
