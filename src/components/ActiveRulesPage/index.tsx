import React, {useEffect} from 'react';
import stylesCommon from '../../common/styles/styles.module.scss';
import MainTemplate from '../../common/MainTemplate';
import RuleList from './components/Performance/RuleList';
import Header from '../../common/components/Header';
import Managing from './components/RightPanel/Managing';
import {useAppDispatch, useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import Toolbar from "./components/Toolbar";
import {RulesPerformance} from "../../store/types/activeRulesTypes";
import RuleGraph from "./components/Performance/RuleGraph";
import RuleTable from "./components/Performance/RuleTable";

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
    const {isLoading, error, currentPerformance} = useTypedSelector(state => state.activeRulesValues);
    const dispatch = useAppDispatch();
    const {setSystemPagesWay, fetchActiveRuleBySystemCode} = useAction();

    useEffect(() => {
        setSystemPagesWay([...systemPagesWay, {
            name: ` / ${currentSystem.name}`,
            code: currentSystem.code,
            systems: currentSystem.children
        }]);

        dispatch(() => fetchActiveRuleBySystemCode(currentSystem.code));
    }, [currentSystem])

    if (isLoading) {
        return <div>Идёт загрузка активных правил...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getCurrentPerformance = () => {
        switch (currentPerformance) {
            case RulesPerformance.list:
                return <RuleList />
            case RulesPerformance.table:
                return <RuleTable />
            case RulesPerformance.lang:
                return <></>
            case RulesPerformance.graph:
                return <RuleGraph />
        }
    }

    return <MainTemplate blocks={<ActiveRulesRightPanel/>}>
        <Toolbar />
        {getCurrentPerformance()}
    </MainTemplate>;
};

export default ActiveRulesPage;
