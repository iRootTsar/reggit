import logo from '../../images/Miles_transparent.png';
import {Link, useLocation} from 'react-router-dom';
import {Disclosure} from '@headlessui/react';
import {FunctionComponent, useContext} from 'react';
import {SearchContext} from './SearchContext';
import SearchBar from './SearchBar';
interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    //{name: 'Login', href: '/login', current: false},
    //{name: 'Home', href: '/', current: false},
    //{name: 'Calendar', href: '/calendar', current: false},
];

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

const Navbar: FunctionComponent = () => {
    const location = useLocation();
    const {searchTerm, setSearchTerm} = useContext(SearchContext);

    return (
        <>
            <div className="bg-gray-800 sticky top-0 z-50">
                <Disclosure as="nav">
                    {({open}) => (
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="absolute left-4 top-4">
                                <img
                                    className="hidden h-8 w-auto lg:block"
                                    src={logo}
                                    alt="Reggit"
                                />
                            </div>
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="flex w-full justify-center items-center">
                                    <div className="flex space-x-4">
                                        {navigation.map(item => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    location.pathname ===
                                                        item.href
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <SearchBar
                                    value={searchTerm}
                                    onChange={setSearchTerm}
                                />
                            </div>
                        </div>
                    )}
                </Disclosure>
            </div>
        </>
    );
};

export default Navbar;
