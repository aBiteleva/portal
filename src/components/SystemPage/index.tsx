import React from 'react';
import MainTemplate from '../../common/MainTemplate';
import stylesCommon from '../../common/styles/styles.module.scss';
import styles from './styles.module.scss';
import Managing from './commonents/RightPanel/Managing';
import Elements from './commonents/RightPanel/Elements';
import Information from './commonents/RightPanel/Information';
import AddButton from './commonents/AddButton';
import Header from '../../common/components/Header';
import SystemElements from './commonents/SystemElements';

const SystemRightPanel = () => {
    console.log('hrl');

    return <>
        <div className={stylesCommon.rightPanelBlock}>
            <Header/>
            <hr className={stylesCommon.line}/>
            <Managing/>
            <hr className={stylesCommon.line}/>
            <Elements/>
            <hr className={stylesCommon.line}/>
            <Information/>
        </div>
    </>;
};
const SystemPage = () => {
    return <MainTemplate blocks={<SystemRightPanel/>} page="ARS / системы / завод - краснореченская 107">
        <div className={styles.addButton}>
            <AddButton/>
        </div>
        <SystemElements/>
    </MainTemplate>;
};

export default SystemPage;
