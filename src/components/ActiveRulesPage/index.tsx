import React, {useEffect} from 'react';
import stylesCommon from '../../common/styles/styles.module.scss';
import MainTemplate from '../../common/MainTemplate';
import Rule from './components/Rule';
import Header from '../../common/components/Header';
import Managing from './components/RightPanel/Managing';
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";

const ActiveRulesRightPanel = () => {
    return <>
        <div className={stylesCommon.rightPanelBlock}>
            <Header/>
            <hr className={stylesCommon.line}/>
            <Managing/>
        </div>
    </>;
};
const ActiveRulesPage = () => {
    const {currentSystem, systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {isLoading, error} = useTypedSelector(state => state.activeRulesValues);
    const dispatch = useAppDispatch();
    const {setSystemPagesWay, fetchActiveRuleBySystemCode} = useAction();

    useEffect(() => {
        dispatch(() => setSystemPagesWay([...systemPagesWay, {
            name: ` / ${currentSystem.name}`,
            code: currentSystem.code,
            systems: currentSystem.children
        }]));

        dispatch(() => fetchActiveRuleBySystemCode(currentSystem.code));
    }, [currentSystem])

    if (isLoading) {
        return <div>Идёт загрузка активных правил...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MainTemplate blocks={<ActiveRulesRightPanel/>}>
        <Rule/>
    </MainTemplate>;
};

export default ActiveRulesPage;
