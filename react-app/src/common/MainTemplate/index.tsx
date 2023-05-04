import React, {FC, ReactNode} from 'react';
// @ts-ignore
import styles from './styles.module.scss'
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

interface MainTemplateInterface {
    page?: string,
    blocks: ReactNode,
    children?: any
}

const MainTemplate: FC<MainTemplateInterface> = ({blocks, page, children}) => {
    return <div className={styles.mainTemplate}>
        <Header />
        <div className={styles.container}>
            <LeftPanel />

            <div className={styles.pageContent}>
                <div className={styles.pageContentTitle}>{page}</div>
                {children}
            </div>

            <RightPanel blocks={blocks}/>
        </div>

    </div>
}

export default MainTemplate;
