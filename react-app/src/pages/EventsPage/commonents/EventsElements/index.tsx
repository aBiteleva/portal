import React from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import variables from '../../../../../variables.module.scss';
import {useAction} from '../../../../hooks/useAction';

const EventsElements = () => {
    const {events, currentEvent} = useTypedSelector(state => state.eventsValues);
    const {setCurrentEvent} = useAction();

    return <>
        <div className={commonStyles.elementsContainer} id="events-container">
            {events?.map(event => (
                <div className={commonStyles.element}
                     style={currentEvent.code === event.code
                         ? {
                             background: variables.yellowColor,
                             color: variables.darkBlueColor
                         }
                         : undefined}
                     onClick={() => setCurrentEvent({...event})}
                     key={event.code}
                     id={event.description}
                >
                    <div className={commonStyles.text}>
                        <div>{event.description}</div>
                        <div
                            className={commonStyles.textId}
                            style={currentEvent.code === event.code
                                ? {
                                    color: variables.greyColor
                                }
                                : undefined}
                        >
                            Id: {event.code}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>;
};

export default EventsElements;
