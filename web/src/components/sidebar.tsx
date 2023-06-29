import {FunctionComponent, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {VisitService} from '../clients/reggit-api/index';
import {Visitor} from 'src/clients/reggit-api/models/Visitor';

interface SidebarProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    selectedVisitor: Visitor | undefined;
    refreshTable: () => void;
}

const Sidebar: FunctionComponent<SidebarProps> = ({
    open,
    setOpen,
    selectedVisitor,
    refreshTable,
}) => {
    const userData = selectedVisitor
        ? {
              name: selectedVisitor.name,
              email: selectedVisitor.email,
              phone: selectedVisitor.phone,
              organization: selectedVisitor.organization,
              imageURL: selectedVisitor.imageURL,
          }
        : undefined;

    // Function to handle delete person
    const deleteVisitors = async (id: number) => {
        VisitService.deleteVisitor(id)
            .then(response => {
                console.log(response);
                setOpen(false);
                refreshTable();
            })
            .catch(error => {
                console.log(error);
            });
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
                                enterFrom="translate-x-60"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-60">
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
                                                    src={
                                                        userData?.imageURL ||
                                                        'No image provided'
                                                    }
                                                    alt={
                                                        userData?.name ||
                                                        'No name provided'
                                                    }
                                                />
                                                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                                                    {userData?.name}
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    {userData?.email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {userData?.phone}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {userData?.organization}
                                                </p>
                                            </div>
                                        </div>
                                        <div className=" flex justify-center items-center">
                                            <button
                                                onClick={() =>
                                                    deleteVisitors(
                                                        selectedVisitor?.id?.toString() as unknown as number
                                                    )
                                                }
                                                className=" m-2 w-48 py-2 bg-gray-700 hover:bg-gray-500 text-white font-bold rounded">
                                                Delete
                                            </button>
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
