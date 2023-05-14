import React from 'react';
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import Icon from '../../../../../common/components/Icon';

const Information = () => {
    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Информация</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="device"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Устройств: 57</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="rules"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Правила: 12</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="logs"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Обработано событий: 123</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="calendar"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Последнее событие: 15.03.2023 3:02</div>
        </div>
    </>;
};

export default Information;
