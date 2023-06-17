import React, {useState} from 'react';
import Icon from '../../../../../common/components/Icon';
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import AddEventModal from '../../AddEventModal';
import {useAppDispatch, useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {useAction} from '../../../../../hooks/useAction';
import {DeleteEventInterface} from '../../../../../store/types/eventsTypes';

const Managing = () => {
    const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
    const {currentSystem} = useTypedSelector(state => state.systemsValues);
    const {currentEvent} = useTypedSelector(state => state.eventsValues);
    const {deleteEvent} = useAction();
    const dispatch = useAppDispatch();

    const onHandleDeleteEvent = async () => {
        const body: DeleteEventInterface = {
            codeEvent: currentEvent.code,
            codeComponent: currentEvent.component[0].code
        };

        await dispatch(() => deleteEvent(body, currentSystem.code));
    };

    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="plus"/>
            <div className={stylesCommon.rightPanelBlockActionText}
                 onClick={() => setIsAddEventModalVisible(true)}
                 id="add-event"
            >
                Добавить
            </div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="info"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Информация</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="korzina"/>
            <div
                id="delete-event-button"
                className={stylesCommon.rightPanelBlockActionText}
                onClick={onHandleDeleteEvent}
            >
                Удалить
            </div>
        </div>
        <AddEventModal
            isVisible={isAddEventModalVisible}
            setIsVisible={setIsAddEventModalVisible}
            currentSystemCode={currentSystem.code}
        />
    </>;
};

export default Managing;
