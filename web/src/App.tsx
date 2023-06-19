import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import DashboardWrapper from './components/DashboardWrapper';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<DashboardWrapper />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
