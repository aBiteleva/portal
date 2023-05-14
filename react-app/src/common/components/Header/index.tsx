import React from 'react';
import styles from './styles.module.scss';
import Icon from '../Icon';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

const Header = () => {
    const {currentSystem} = useTypedSelector(state => state.systemsValues);

    return <div className={styles.header}>
        <Icon name="zavod"/>
        <div className={styles.header__text}>{currentSystem.name}</div>
    </div>;
};

export default Header;
