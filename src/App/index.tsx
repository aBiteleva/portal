import React, {useEffect} from 'react';
import SystemPage from '../components/SystemPage';
import './styles.module.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EventsPage from "../components/EventsPage";
import LoginPage from "../components/LoginPage";
import {useAction} from "../hooks/useAction";
import {useAppDispatch, useTypedSelector} from "../hooks/useTypedSelector";

const App = (props: any) => {
    const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    const {checkAuth} = useAction();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(() => checkAuth())
        }
    }, []);

    if(isLoading){
        return <div>Загрузка...</div>
    }

    if(!isAuth){
        return <LoginPage {...props}/>
    }

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
