import React, {FC} from 'react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {useLocation} from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const {currentSystem} = useTypedSelector(state => state.systemsValues);
    const {currentActiveRule} = useTypedSelector(state => state.activeRulesValues);

    const getHeader = () => {
        if (currentActiveRule?.description
            && (['/active-rules', '/editor-active-rules'].includes(location.pathname))) {
            return currentActiveRule.description;
        }
        return currentSystem.name;
    };


    return <div className={styles.header}>
        <Icon name="zavod"/>
        <div className={styles.header__text}>{getHeader()}</div>
    </div>;
};

export default Header;
