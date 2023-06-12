import React, {useEffect} from 'react';
import MainTemplate from '../../common/MainTemplate';
import RuleTags from './components/Performance/RuleTags';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import {useAction} from '../../hooks/useAction';
import {RulesPerformance} from '../../store/types/activeRulesTypes';
import RuleTable from './components/Performance/RuleTable';
import RightPanel from './components/RightPanel';

const ActiveRulesPage = () => {
    const {currentSystem, systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {isLoading, error, currentPerformance} = useTypedSelector(state => state.activeRulesValues);
    const dispatch = useAppDispatch();
    const {setSystemPagesWay, fetchActiveRuleBySystemCode, fetchEventsBySystemCode} = useAction();
    const currentSystemCode = localStorage.getItem('currentSystemCode');

    useEffect(() => {
        setSystemPagesWay([...systemPagesWay, {
            name: ` / ${currentSystem.name}`,
            code: currentSystem.code,
            systems: currentSystem.children
        }]);

        dispatch(() => fetchActiveRuleBySystemCode(currentSystemCode || currentSystem.code));
        dispatch(() => fetchEventsBySystemCode(currentSystemCode || currentSystem.code));
    }, [currentSystem]);

    if (isLoading) {
        return <div>Идёт загрузка активных правил...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getCurrentPerformance = () => {
        switch (currentPerformance) {
            case RulesPerformance.tag:
                return <MainTemplate blocks={<RightPanel/>} id="active-rules-container">
                    <RuleTags />
                </MainTemplate>;
            case RulesPerformance.table:
                return <MainTemplate blocks={<RightPanel/>} id="active-rules-container">
                    <RuleTable />
                </MainTemplate>;
        }
    };

    return getCurrentPerformance();
};

export default ActiveRulesPage;
