import React from 'react';
import SystemPage from '../components/SystemPage';
import './styles.module.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EventsPage from "../components/EventsPage";

const App = (props: any) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SystemPage {...props} />} />
                <Route path="/events" element={<EventsPage {...props} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
