import React from 'react';
import stylesCommon from "../../common/styles/styles.module.scss";
import MainTemplate from "../../common/MainTemplate";
import Toolbar from "./components/Toolbar";
import Devices from "./components/Devices";
import Header from "../../common/components/Header";
import Managing from "./components/RightPanel/Managing";

const DevicesRightPanel = () => {
    return <>
        <div className={stylesCommon.rightPanelBlock}>
            <Header />
            <hr className={stylesCommon.line}/>
            <Managing/>
        </div>
    </>
}
const DevicesPage = () => {
    return <MainTemplate blocks={<DevicesRightPanel/>} page='ARS / системы / завод - краснореченская 107/ сборка эл. компонентов'>
        <Toolbar />
        <Devices />
    </MainTemplate>
};

export default DevicesPage;
