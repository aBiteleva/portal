import React from 'react';
import styles from './styles.module.scss'
import Icon from "../../../common/components/Icon";

const Header = () => {
    return <div className={styles.header}>
        <div className={styles.headerTitle}>
            <Icon name='logo' className={styles.headerTitleImg}/>
            <div className={styles.headerTitleText}>ARS</div>
        </div>
        <div className={styles.headerMenu}>
            <a>Главная</a>
            <a>Документация</a>
            <a>О проекте</a>
            <a>Тарифы</a>
            <a>Еще</a>
        </div>

    </div>
};

export default Header;
