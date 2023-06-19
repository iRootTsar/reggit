import React from 'react';
import {Link} from 'react-router-dom';

const Footer: React.FC = (props: any) => {
    return (
        <footer
            className="sticky bottom-0 bg-white squared shadow dark:bg-gray-800 flex justify-center border-t border-gray-600"
            style={{marginTop: 'auto'}}>
            <div className="w-full mx-auto p-4 md:py-8">
                <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-white-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link to="#" className="mr-4 hover:underline md:mr-6 ">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="mr-4 hover:underline md:mr-6">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:underline">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
