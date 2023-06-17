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
    id?: string,
    children?: any
}

const MainTemplate: FC<MainTemplateInterface> = ({blocks, id, children}) => {
    const {systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {setCurrentSystems} = useAction();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onPageNameClick = (page: SystemPagesWayInterface) => {
        if (['/editor-active-rules', '/active-rules-script'].includes(location.pathname)
            && systemPagesWay.indexOf(page) + 1 === systemPagesWay.length-1) {
            navigate('/active-rules');
            dispatch(() => setCurrentSystems(page.systems));
            systemPagesWay.splice(systemPagesWay.indexOf(page), systemPagesWay.length);
        } else {
            navigate('/');
            dispatch(() => setCurrentSystems(page.systems));
            systemPagesWay.splice(systemPagesWay.indexOf(page) + 1, systemPagesWay.length);
        }
    };

    return <div className={styles.mainTemplate} id={id}>
        <Header/>
        <div className={styles.container}>
            <LeftPanel/>

            <div className={styles.pageContent}>
                <div className={styles.pageContentHeader}>
                    {systemPagesWay?.map((page, index) => <div key={page.code}
                                                               onClick={() => index !== systemPagesWay.length - 1
                                                                   && onPageNameClick(page)}
                                                               className={styles.pageContentHeaderTitle}>
                            {page.name}
                        </div>
                    )}
                </div>
                {children}
            </div>

            <RightPanel blocks={blocks}/>
        </div>
    </div>;
};

export default MainTemplate;
