import React, {FC, ReactNode} from 'react';
import styles from './styles.module.scss'
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {SystemPagesWayInterface} from "../../store/types/systemsTypes";

interface MainTemplateInterface {
    page?: string,
    blocks: ReactNode,
    children?: any
}

const MainTemplate: FC<MainTemplateInterface> = ({blocks, children}) => {
    const {systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {setCurrentSystems, setSystemPagesWay} = useAction();
    const dispatch = useAppDispatch();

    const onPageNameClick = (page: SystemPagesWayInterface) => {
        dispatch(() => setCurrentSystems(page.systems));
        systemPagesWay.splice(systemPagesWay.indexOf(page)+1, 1);
        console.log({systemPagesWay})
    };

    return <div className={styles.mainTemplate}>
        <Header />
        <div className={styles.container}>
            <LeftPanel />

            <div className={styles.pageContent}>
                {systemPagesWay?.map(page => <div key={page.code} onClick={() => onPageNameClick(page)} className={styles.pageContentTitle}>{page.name} / </div>)}

                {children}
            </div>

            <RightPanel blocks={blocks}/>
        </div>

    </div>
}

export default MainTemplate;
