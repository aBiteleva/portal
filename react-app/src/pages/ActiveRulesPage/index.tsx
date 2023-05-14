import React, {useEffect} from 'react';
import MainTemplate from '../../common/MainTemplate';
import RuleList from './components/Performance/RuleList';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import {useAction} from '../../hooks/useAction';
import {RulesPerformance} from '../../store/types/activeRulesTypes';
import RuleGraph from './components/Performance/RuleGraph/index';
import RuleTable from './components/Performance/RuleTable';
import RightPanel from './components/RightPanel';

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
    }, [currentSystem]);

    if (isLoading) {
        return <div>Идёт загрузка активных правил...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getCurrentPerformance = () => {
        switch (currentPerformance) {
            case RulesPerformance.list:
                return <MainTemplate blocks={<RightPanel/>}>
                    <RuleList />
                </MainTemplate>;
            case RulesPerformance.table:
                return <MainTemplate blocks={<RightPanel/>}>
                    <RuleTable />
                </MainTemplate>;
            case RulesPerformance.lang:
                return <></>;
            case RulesPerformance.graph:
                return <RuleGraph />;
        }
    };

    return getCurrentPerformance();
};

export default ActiveRulesPage;
