import React from 'react';
import stylesCommon from "../../common/styles/styles.module.scss";
import MainTemplate from "../../common/MainTemplate";
import Toolbar from "./components/Toolbar";
import Events from "./components/Events";
import Header from "../../common/components/Header";
import Managing from "./components/RightPanel/Managing";

const EventsRightPanel = () => {
    return <>
        <div className={stylesCommon.rightPanelBlock}>
            <Header />
            <hr className={stylesCommon.line}/>
            <Managing/>
        </div>
    </>
}
const EventsPage = () => {
    return <MainTemplate blocks={<EventsRightPanel/>} page='ARS / системы / завод - краснореченская 107/ сборка эл. компонентов'>
        <Toolbar />
        <Events />
    </MainTemplate>
};

export default EventsPage;
