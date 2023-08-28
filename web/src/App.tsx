import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import PhotoScreen from './pages/register_pages/photoscreen';
import Registration from './pages/register_pages/registration';
import LabelPreview from './pages/register_pages/labelpreview';

import DashboardWrapper from './components/DashboardWrapper';
import {SearchContext} from './components/common/SearchContext';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<DashboardWrapper />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/photoscreen" element={<PhotoScreen />} />
                    <Route path="/registration" element={<Registration />} />¨
                    <Route path="/labelpreview" element={<LabelPreview />} />
                </Routes>
            </Router>
        </SearchContext.Provider>
    );
}

export default App;
