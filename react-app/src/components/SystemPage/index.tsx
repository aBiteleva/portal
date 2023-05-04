import React from 'react';
import MainTemplate from "../../common/MainTemplate";
// @ts-ignore
import stylesCommon from "../../App/styles.module.scss";
// @ts-ignore
import styles from "./styles.module.scss";
import Managing from "./commonents/RightPanel/Managing";
import Elements from "./commonents/RightPanel/Elements";
import Information from "./commonents/RightPanel/Information";
import AddButton from "./commonents/AddButton";
import Header from "./commonents/RightPanel/Header";
import SystemElements from "./commonents/SystemElements";

const SystemRightPanel = () => {
    return <>
        <div className={stylesCommon.rightPanelBlock}>
            <Header />
            <hr className={stylesCommon.line}/>
            <Managing/>
            <hr className={stylesCommon.line}/>
            <Elements/>
            <hr className={stylesCommon.line}/>
            <Information/>
        </div>
    </>
}
const SystemPage = () => {
    return <MainTemplate blocks={<SystemRightPanel/>} page='ARS / системы / завод - краснореченская 107'>
        <div className={styles.addButton}>
            <AddButton />
        </div>
        <SystemElements />
    </MainTemplate>
};

export default SystemPage;
