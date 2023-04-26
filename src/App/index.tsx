import React from 'react';
import SystemPage from '../components/SystemPage';
import '../common/styles/styles.module.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EventsPage from "../components/EventsPage";
import DevicesPage from "../components/DevicesPage";

const App = (props: any) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SystemPage {...props} />} />
                <Route path="/events" element={<EventsPage {...props} />} />
                <Route path="/devices" element={<DevicesPage {...props} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
