import React from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';

const EventsElements = () => {
    const {events} = useTypedSelector(state => state.eventsValues);

    return <>
        <div className={commonStyles.elementsContainer}>
            {events?.map(event => (
                <div className={commonStyles.element} key={event.code}>
                    <div className={commonStyles.text}>
                        <div>{event.description}</div>
                        <div className={commonStyles.textId}>Id: {event.code}</div>
                    </div>
                </div>
            ))}
        </div>
    </>;
};

export default EventsElements;
