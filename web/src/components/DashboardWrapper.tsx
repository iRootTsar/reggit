import Navbar from './common/navbar';
import {Outlet} from 'react-router-dom';

const DashboardWrapper = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-800 overflow-hidden">
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardWrapper;
