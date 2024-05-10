// src/routes/Router.tsx
import React from 'react';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginForm from '../components/specific/LoginForm';
import Dashboard from '../components/specific/Dashboard';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
