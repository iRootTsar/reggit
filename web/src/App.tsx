import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';

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
                </Routes>
            </Router>
        </SearchContext.Provider>
    );
}

export default App;
