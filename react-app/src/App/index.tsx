import React, {useEffect} from 'react';
import SystemPage from '../pages/SystemPage';
import '../common/styles/styles.module.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ActiveRulesPage from '../pages/ActiveRulesPage';
import EventsPage from '../pages/EventsPage';
import LoginPage from '../pages/LoginPage';
import {useAction} from '../hooks/useAction';
import {useAppDispatch, useTypedSelector} from '../hooks/useTypedSelector';
import EditorActiveRulesPage from '../pages/EditorActiveRulesPage';

const App = (props: any) => {
    const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    const {checkAuth} = useAction();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(() => checkAuth());
        }
    }, []);

    if(isLoading){
        return <div>Загрузка...</div>;
    }

    if(!isAuth){
        return <LoginPage {...props}/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SystemPage {...props} />} />
                <Route path="/active-rules" element={<ActiveRulesPage {...props} />} />
                <Route path="/editor-active-rules" element={<EditorActiveRulesPage {...props} />} />
                <Route path="/events" element={<EventsPage {...props} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
