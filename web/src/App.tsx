import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
    return (
        <>
            <Router>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/home"
                            element={
                                <>
                                    {' '}
                                    <Navbar /> <Home />{' '}
                                </>
                            }
                        />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

export default App;
