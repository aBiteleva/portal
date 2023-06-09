import React, {useEffect} from 'react';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import {useAction} from '../../hooks/useAction';
import EventsElements from './commonents/EventsElements';
import RightPanel from './commonents/RightPanel';
import MainTemplate from '../../common/MainTemplate';

const EventsPage = () => {
    const {currentSystem, systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {isLoading, error} = useTypedSelector(state => state.eventsValues);
    const dispatch = useAppDispatch();
    const {setSystemPagesWay, fetchEventsBySystemCode} = useAction();
    const currentSystemCode = localStorage.getItem('currentSystemCode');

    useEffect(() => {
        setSystemPagesWay([...systemPagesWay, {
            name: ` / ${currentSystem.name}`,
            code: currentSystem.code,
            systems: currentSystem.children
        }]);

        currentSystemCode && dispatch(() => fetchEventsBySystemCode(currentSystemCode));
    }, [currentSystem]);

    if (isLoading) {
        return <div>Идёт загрузка событий...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MainTemplate blocks={<RightPanel/>}>
        <EventsElements />
    </MainTemplate>;

};

export default EventsPage;
