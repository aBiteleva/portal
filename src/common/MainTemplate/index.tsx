import React, {FC, ReactNode} from 'react';
import styles from './styles.module.scss';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import {useAction} from '../../hooks/useAction';
import {SystemPagesWayInterface} from '../../store/types/systemsTypes';
import {useLocation, useNavigate} from 'react-router-dom';

interface MainTemplateInterface {
    page?: string,
    blocks: ReactNode,
    children?: any
}

const MainTemplate: FC<MainTemplateInterface> = ({blocks, children}) => {
    const {systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {setCurrentSystems, setSystemPagesWay} = useAction();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onPageNameClick = (page: SystemPagesWayInterface) => {
        if(location.pathname !== '/'){
            navigate('/');
        }
        dispatch(() => setCurrentSystems(page.systems));
        systemPagesWay.splice(systemPagesWay.indexOf(page) + 1, systemPagesWay.length);
    };

    return <div className={styles.mainTemplate}>
        <Header/>
        <div className={styles.container}>
            <LeftPanel/>

            <div className={styles.pageContent}>
                <div className={styles.pageContentHeader}>
                    {systemPagesWay?.map(page => <div key={page.code} onClick={() => onPageNameClick(page)}
                                                      className={styles.pageContentHeaderTitle}>{page.name}</div>)}
                </div>
                {children}
            </div>

            <RightPanel blocks={blocks}/>
        </div>

    </div>;
};

export default MainTemplate;
