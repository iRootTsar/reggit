import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {Visitor} from 'clients/reggit-api/models/Visitor';
import {VisitService} from 'clients/reggit-api/dist/services/VisitService';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedVisitor: Visitor | undefined;
    refreshTable: () => void;
}

const Modal: React.FC<ModalProps> = ({
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

    const deleteVisitor = async (id: number) => {
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
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"></span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="sm:flex-grow">
                                        <h2 className="mb-4 mt-4 text-2xl font-semibold text-gray-900">
                                            {userData?.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Email: {userData?.email}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Phone: {userData?.phone}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Organization:{' '}
                                            {userData?.organization}
                                        </p>
                                    </div>
                                    <div className="sm:ml-8 mt-16">
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
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() =>
                                        deleteVisitor(
                                            selectedVisitor?.id as unknown as number
                                        )
                                    }
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
