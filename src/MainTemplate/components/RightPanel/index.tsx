import React from 'react';
import styles from './styles.module.scss'
import Header from "./components/Header";
import Managing from "./components/Managing";


const RightPanel = () => {

    return <div className={styles.rightPanel}>
        <Header />
        <hr className={styles.line}/>
        <Managing />
    </div>;
};

export default RightPanel;
