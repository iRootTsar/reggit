import React, {useState} from 'react';
import {Link} from 'react-router-dom';

// Dummy image
import wick from '../images/dummyimages/babayaga.jpg';
import john from '../images/dummyimages/john.jpg';
import mary from '../images/dummyimages/mary.jpg';
import patricia from '../images/dummyimages/patricia.jpg';
import robert from '../images/dummyimages/robert.jpg';
import jane from '../images/dummyimages/jane.jpg';
// Dummy data for table
const people = [
    {
        profilePic: wick,
        name: 'Jardani "John Wick" Jovonovich',
        email: 'babayaga@forhire.com',
        phone: '(1) 666-666-666',
        organization: 'Ruska Roma',
    },
    {
        profilePic: john,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '(123) 456-7890',
        organization: 'Acme Corporation',
    },
    {
        profilePic: jane,
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '(987) 654-3210',
        organization: 'Beta Industries',
    },
    {
        profilePic: mary,
        name: 'Mary Johnson',
        email: 'maryjohnson@example.com',
        phone: '(564) 738-9201',
        organization: 'Gamma Tech',
    },
    {
        profilePic: robert,
        name: 'Robert Brown',
        email: 'robertbrown@example.com',
        phone: '(312) 495-6780',
        organization: 'Delta Solutions',
    },
    {
        profilePic: patricia,
        name: 'Patricia Davis',
        email: 'patriciadavis@example.com',
        phone: '(903) 215-4678',
        organization: 'Epsilon Industries',
    },
    {
        profilePic: wick,
        name: 'Jardani "John Wick" Jovonovich',
        email: 'babayaga@forhire.com',
        phone: '(1) 666-666-666',
        organization: 'Ruska Roma',
    },
    {
        profilePic: john,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '(123) 456-7890',
        organization: 'Acme Corporation',
    },
    {
        profilePic: jane,
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '(987) 654-3210',
        organization: 'Beta Industries',
    },
    {
        profilePic: mary,
        name: 'Mary Johnson',
        email: 'maryjohnson@example.com',
        phone: '(564) 738-9201',
        organization: 'Gamma Tech',
    },
    {
        profilePic: robert,
        name: 'Robert Brown',
        email: 'robertbrown@example.com',
        phone: '(312) 495-6780',
        organization: 'Delta Solutions',
    },
    {
        profilePic: patricia,
        name: 'Patricia Davis',
        email: 'patriciadavis@example.com',
        phone: '(903) 215-4678',
        organization: 'Epsilon Industries',
    },
    {
        profilePic: wick,
        name: 'Jardani "John Wick" Jovonovich',
        email: 'babayaga@forhire.com',
        phone: '(1) 666-666-666',
        organization: 'Ruska Roma',
    },
    {
        profilePic: john,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '(123) 456-7890',
        organization: 'Acme Corporation',
    },
    {
        profilePic: jane,
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '(987) 654-3210',
        organization: 'Beta Industries',
    },
    {
        profilePic: mary,
        name: 'Mary Johnson',
        email: 'maryjohnson@example.com',
        phone: '(564) 738-9201',
        organization: 'Gamma Tech',
    },
    {
        profilePic: robert,
        name: 'Robert Brown',
        email: 'robertbrown@example.com',
        phone: '(312) 495-6780',
        organization: 'Delta Solutions',
    },
    {
        profilePic: patricia,
        name: 'Patricia Davis',
        email: 'patriciadavis@example.com',
        phone: '(903) 215-4678',
        organization: 'Epsilon Industries',
    },
];

const Home: React.FC = () => {
    // Search field
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle delete person
    const handleDeletePerson = (personName: string) => {
        console.log(`Delete ${personName}`);
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
                        <tr>
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
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {people
                            .filter(person => {
                                const lowerTerm = searchTerm.toLowerCase();
                                return (
                                    person.name
                                        .toLowerCase()
                                        .includes(lowerTerm) ||
                                    person.email
                                        .toLowerCase()
                                        .includes(lowerTerm) ||
                                    person.phone
                                        .toLowerCase()
                                        .includes(lowerTerm) ||
                                    person.organization
                                        .toLowerCase()
                                        .includes(lowerTerm)
                                );
                            })
                            .map((person, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className=" px-2 py-4">
                                        <img
                                            src={person.profilePic}
                                            alt={person.name}
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {person.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.organization}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/edit/${person.name}`}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeletePerson(person.name)
                                            }
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
