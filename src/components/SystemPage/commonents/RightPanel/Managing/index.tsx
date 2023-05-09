import React from 'react';
import Icon from '../../../../../common/components/Icon';
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import {useAction} from '../../../../../hooks/useAction';
import {useAppDispatch, useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {DeleteSystemInterface} from '../../../../../store/types/systemsTypes';

const Managing = () => {
    const {currentSystem} = useTypedSelector(state => state.systemsValues);
    const {fetchSystems, deleteSystem} = useAction();
    const dispatch = useAppDispatch();

    const onHandleDeleteSystem = async () => {
        const body: DeleteSystemInterface = {
            code: currentSystem.code,
            confirmAttach: false,
            confirmComponent: false
        };

        await dispatch(() => deleteSystem(body));
    };

    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="status"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Статус</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="rename"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Переименовать</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="color"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Цвет</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction} onClick={onHandleDeleteSystem}>
            <Icon name="korzina"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Удалить</div>
        </div>
    </>;
};

export default Managing;
