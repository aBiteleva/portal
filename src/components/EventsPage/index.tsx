import React from 'react';
import stylesCommon from "../../App/styles.module.scss";
import styles from "./styles.module.scss";
import MainTemplate from "../../common/MainTemplate";

const EventsRightPanel = () => {
    return <>
        <div className={stylesCommon.rightPanelBlock}>
            {/*<Header />*/}
            {/*<hr className={stylesCommon.line}/>*/}
            {/*<Managing/>*/}
            {/*<hr className={stylesCommon.line}/>*/}
            {/*<Elements/>*/}
            {/*<hr className={stylesCommon.line}/>*/}
            {/*<Information/>*/}
        </div>
    </>
}
const EventsPage = () => {
    return <MainTemplate blocks={<EventsRightPanel/>} page='ARS / системы / завод - краснореченская 107'>
        {/*<div className={styles.addButton}>*/}
        {/*    <AddButton />*/}
        {/*</div>*/}
        <EventsRightPanel />
    </MainTemplate>
};

export default EventsPage;
