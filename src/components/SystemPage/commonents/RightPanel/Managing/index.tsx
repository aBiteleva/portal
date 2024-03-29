import React from 'react';
import Icon from "../../../../../common/components/Icon";
import stylesCommon from "../../../../../App/styles.module.scss";

const Managing = () => {
    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='status'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Статус</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='rename'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Переименовать</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='color'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Цвет</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='korzina'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Удалить</div>
        </div>
    </>
}

export default Managing;
