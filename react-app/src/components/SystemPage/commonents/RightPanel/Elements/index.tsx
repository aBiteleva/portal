import Icon from "../../../../../common/components/Icon";
import React from "react";
// @ts-ignore
import stylesCommon from "../../../../../App/styles.module.scss";
import {Link} from "react-router-dom";

const Elements = () => {
    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Элементы системы</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='events'/>
            <div className={stylesCommon.rightPanelBlockActionText}><Link to='/events'>Список событий</Link></div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name='study'/>
            <div className={stylesCommon.rightPanelBlockActionText}>Список правил</div>
        </div>
    </>
};

export default Elements;
