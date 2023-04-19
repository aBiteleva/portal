import React, {FC} from 'react';
import styles from './styles.module.scss'
import {Button} from "antd";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";

interface MainTemplateInterface {
    page: string,
    actions: any[],
    children: any
}

const MainTemplate: FC<MainTemplateInterface> = ({page, actions, children}) => {

    return <div className={styles.mainTemplate}>
        <Header />
        <div className={styles.container}>
            <LeftPanel />

            <div className={styles.pageContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerText}>
                        {page}
                    </div>
                    <div className={styles.headerIcons}>
                        {actions.map(act => <div className={styles.icon}><Button onClick={act.onClick} type="text"
                                                                                 className={styles.iconComponent}>{act.icon}</Button>
                        </div>)}
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentHeader}></div>
                    {children}
                </div>
            </div>

        </div>

        {/*{children}*/}
    </div>
}

export default MainTemplate;
