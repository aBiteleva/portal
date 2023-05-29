import React from 'react';
import Icon from '../../../../../common/components/Icon';
import stylesCommon from '../../../../../common/styles/styles.module.scss';

const Managing = () => {
    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="info"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Информация</div>
        </div>
    </>;
};

export default Managing;
