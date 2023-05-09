import React from 'react';
import styles from './styles.module.scss';
import Icon from '../../../components/Icon';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return <div className={styles.header}>
        <div className={styles.headerTitle} onClick={() => navigate('/')}>
            <Icon name="logo" className={styles.headerTitleImg} />
            <div className={styles.headerTitleText}>ARS</div>
        </div>
        <div className={styles.headerMenu}>
            <a>Главная</a>
            <a>Документация</a>
            <a>О проекте</a>
            <a>Тарифы</a>
            <a>Еще</a>
            <Icon name="arrowDown"/>
        </div>

    </div>;
};

export default Header;
