import React from 'react';
// @ts-ignore
import styles from './styles.module.scss';
import Systems from './components/Systems';
import Account from './components/Account';

const LeftPanel = () => {

    return <div className={styles.leftPanel}>
        <Systems/>
        <Account/>
    </div>;
};

export default LeftPanel;
