import {FunctionComponent, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import picture from '../images/dummyimages/babayaga.jpg';

interface SidebarProps {
    open: boolean;
    setOpen: (state: boolean) => void;
}

interface UserData {
    name: string;
    email: string;
    phone: string;
    organization: string;
    picture: string;
}

const Sidebar: FunctionComponent<SidebarProps> = ({open, setOpen}) => {
    // Static data
    const userData: UserData = {
        name: 'Jardani "John Wick" Jovonovich',
        email: 'babayaga@forhire.com',
        phone: '+1 666 666 666',
        organization: 'Ruska Roma',
        picture: picture,
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-hidden"
                onClose={() => setOpen(false)}>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full">
                                <Dialog.Panel className="w-screen max-w-md pt-48">
                                    <div className="flex h-4/6 flex-col overflow-y-scroll bg-gray-300 py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-center text-lg font-semibold leading-6 text-gray-900">
                                                User Profile
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex flex-col items-center">
                                                <img
                                                    className="w-38 h-38 rounded-full"
                                                    src={userData.picture}
                                                    alt={userData.name}
                                                />
                                                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                                                    {userData.name}
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    {userData.email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {userData.phone}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {userData.organization}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Sidebar;
