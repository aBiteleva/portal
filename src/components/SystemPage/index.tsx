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
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {setCurrentSystems, setSystemPagesWay} from "../../store/action-creators/systems";

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

    useEffect(() => {
        dispatch(() => fetchSystems());
    }, []);

    useEffect(() => {
        setCurrentSystems(systems);
        dispatch(() => setSystemPagesWay([{
            name: 'ARS',
            code: '0000',
            systems
        }]));
    }, [systems])

    if (isLoading) {
        return <div>Идёт загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const onDoubleClick = (elementChildren: any[]) => {
        if (elementChildren && elementChildren.length > 0) {
            dispatch(() => setSystemPagesWay([...systemPagesWay, {
                name: currentSystem.name,
                code: currentSystem.code,
                systems: elementChildren
            }]));
            setCurrentSystems(elementChildren);
        }
    }


    return <MainTemplate blocks={<SystemRightPanel/>}>
        <div className={styles.addButton}>
            <AddButton/>
        </div>
        <SystemElements systems={currentSystems} onDoubleClick={onDoubleClick}/>
    </MainTemplate>;
};

export default SystemPage;
