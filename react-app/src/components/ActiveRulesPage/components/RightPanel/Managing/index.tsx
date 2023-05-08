import React from 'react';
import Icon from '../../../../../common/components/Icon';
// @ts-ignore
import stylesCommon from '../../../../../common/styles/styles.module.scss';

const Managing = () => {
  return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
          <Icon name="plus"/>
          <div className={stylesCommon.rightPanelBlockActionText}>Добавить</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
          <Icon name="info"/>
          <div className={stylesCommon.rightPanelBlockActionText}>Информация</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
          <Icon name="korzina"/>
          <div className={stylesCommon.rightPanelBlockActionText}>Удалить</div>
        </div>
    </>;
};

export default Managing;
