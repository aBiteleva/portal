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
import {SystemService} from '../../api/services/SystemService';

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
        currentSystem,
        systemPagesWay
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

    const onDoubleClick = async (elementChildren: any[]) => {
        const children = await SystemService.fetchSystemByCode(currentSystem.code);
        dispatch(() => setSystemPagesWay([...systemPagesWay, {
            name: systemPagesWay.length < 1 ? currentSystem.name : ` / ${currentSystem.name}`,
            code: currentSystem.code,
            systems: children.data.children
        }]));
        setCurrentSystems(children.data.children);
    };


    return <MainTemplate blocks={<SystemRightPanel/>} id="systems-page">
        <div className={styles.addButton}>
            <AddButton onClick={() => setIsAddModalVisible(true)}/>
        </div>
        <SystemElements onDoubleClick={onDoubleClick}/>
        <AddModal isVisible={isAddModalVisible} setIsVisible={setIsAddModalVisible}/>
    </MainTemplate>;
};

export default SystemPage;
