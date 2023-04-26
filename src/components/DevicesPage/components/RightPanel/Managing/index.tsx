import React from 'react';
import Icon from "../../../../../common/components/Icon";
import stylesCommon from "../../../../../common/styles/styles.module.scss";

const Managing = () => {
    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='status'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Статус</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='plus'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Добавить тэг</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='analyse'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Анализ правила</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='korzina'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Удалить</div>
        </div>
    </>
}

export default Managing;
