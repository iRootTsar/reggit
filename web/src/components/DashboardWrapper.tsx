import Footer from './common/footer';
import Navbar from './common/navbar';
import {Outlet} from 'react-router-dom';

const DashboardWrapper = () => {
    return (
        <div className="flex flex-col bg-gray-800">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default DashboardWrapper;
