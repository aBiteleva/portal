import Icon from '../../../../../common/components/Icon';
import React from 'react';
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import { Link } from 'react-router-dom';
import variables from '../../../../../../variables.module.scss';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';

const Elements = () => {
    const {currentSystem} = useTypedSelector(state => state.systemsValues);
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
                        onClick={() => {
                            localStorage.removeItem('currentSystemCode');
                            localStorage.setItem('currentSystemCode', currentSystem.code);
                        }}
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
