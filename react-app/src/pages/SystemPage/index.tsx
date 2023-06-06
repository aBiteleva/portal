import React, {useEffect, useState} from 'react';
import MainTemplate from '../../common/MainTemplate';
import stylesCommon from '../../common/styles/styles.module.scss';
import styles from './styles.module.scss';
import Managing from './commonents/RightPanel/Managing';
import Elements from './commonents/RightPanel/Elements';
import Information from './commonents/RightPanel/Information';
import AddButton from './commonents/AddButton';
import Header from '../../common/components/Header';
import SystemElements from './commonents/SystemElements';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import {useAction} from '../../hooks/useAction';
import {setCurrentSystems, setSystemPagesWay} from '../../store/action-creators/systems';
import AddModal from './commonents/AddModal';

const SystemRightPanel = () => {
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
    const {
        isLoading,
        error,
        systems,
        currentSystem,
        systemPagesWay,
        currentSystems
    } = useTypedSelector(state => state.systemsValues);
    const {fetchSystems, setSystemPagesWay, setCurrentSystems} = useAction();
    const dispatch = useAppDispatch();

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    useEffect(() => {
        dispatch(() => fetchSystems());
    }, []);

    if (isLoading) {
        return <div>Идёт загрузка систем...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const onDoubleClick = (elementChildren: any[]) => {
        if (elementChildren && elementChildren.length > 0) {
            dispatch(() => setSystemPagesWay([...systemPagesWay, {
                name: systemPagesWay.length < 1 ? currentSystem.name : ` / ${currentSystem.name}`,
                code: currentSystem.code,
                systems: elementChildren
            }]));
            setCurrentSystems(elementChildren);
        }
    };


    return <MainTemplate blocks={<SystemRightPanel/>}>
        <div className={styles.addButton}>
            <AddButton onClick={() => setIsAddModalVisible(true)}/>
        </div>
        <SystemElements systems={currentSystems} onDoubleClick={onDoubleClick}/>
        <AddModal isVisible={isAddModalVisible} setIsVisible={setIsAddModalVisible}/>
    </MainTemplate>;
};

export default SystemPage;
