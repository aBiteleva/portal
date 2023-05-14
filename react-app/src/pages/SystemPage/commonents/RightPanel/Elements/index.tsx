import Icon from '../../../../../common/components/Icon';
import React from 'react';
// @ts-ignore
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import { Link } from 'react-router-dom';
// @ts-ignore
import variables from '../../../../../../variables.module.scss';

const Elements = () => {
    return (
        <>
            <div className={stylesCommon.rightPanelBlockTitle}>Элементы системы</div>
            <div className={stylesCommon.rightPanelBlockAction}>
                <Icon name="events"/>
                <div className={stylesCommon.rightPanelBlockActionText}>
                    <Link
                        style={{textDecoration: 'none', color: variables.yellowColor}}
                        to="/events"
                    >
                        Список событий
                    </Link>
                </div>
            </div>
            <div className={stylesCommon.rightPanelBlockAction}>
                <Icon name="study"/>
                <div className={stylesCommon.rightPanelBlockActionText}>
                    <Link
                        style={{textDecoration: 'none', color: variables.yellowColor}}
                        to="/active-rules"
                    >
                        Список правил
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Elements;
