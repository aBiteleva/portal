import React from 'react';
import styles from './styles.module.scss'
import Icon from "../../../../../common/components/Icon";

const Header = () => {
    return <div className={styles.header}>
        <Icon name='zavod' />
        <div className={styles.headerText}>
            <div className={styles.headerTextName}>Завод - Краснореченская 107</div>
            <div>Главный зал</div>
        </div>
    </div>
};

export default Header;
