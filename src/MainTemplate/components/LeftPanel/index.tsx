import React from 'react';
import styles from './styles.module.scss'
import Icon from "../../../common/components/Icon";
import Systems from "./components/Systems";
import Account from "./components/Account";

const LeftPanel = () => {

    return <div className={styles.leftPanel}>
        <Systems />
        <Account />
    </div>;
};

export default LeftPanel;
