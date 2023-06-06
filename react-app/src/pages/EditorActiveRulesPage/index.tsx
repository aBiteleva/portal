import React, {useEffect} from 'react';
import MainTemplate from '../../common/MainTemplate';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import RuleGraph from './components/Performance/EditorRuleGraph/index';
import RightPanel from '../ActiveRulesPage/components/RightPanel';
import {EditorRulesPerformance} from '../../store/types/editorActiveRulesTypes';
import EditorRulePerformanceSelect from './components/EditorRulePerformanceSelect';
import {useAction} from '../../hooks/useAction';
import EditorRuleList from './components/Performance/EditorRuleList';

const EditorActiveRulesPage = () => {
    const {currentEditorRulePerformance} = useTypedSelector(state => state.editorActiveRulesValues);
    const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '');

    useEffect(() => {
        // if(currentActiveRuleObject) {
        //     setSystemPagesWay([...systemPagesWay, {
        //         name: ` / ${currentActiveRuleObject.description}`,
        //         code: currentActiveRuleObject.code,
        //         systems: activeRules
        //     }]);
        // }

    }, [currentActiveRuleObject]);

    const getCurrentEditorRulePerformance = () => {
        switch (currentEditorRulePerformance) {
            case EditorRulesPerformance.list:
                return <MainTemplate blocks={<RightPanel/>}>
                    <EditorRuleList />
                </MainTemplate>;
            case EditorRulesPerformance.lang:
                return <MainTemplate blocks={<RightPanel/>}>
                    <EditorRulePerformanceSelect/>
                </MainTemplate>;
            case EditorRulesPerformance.graph:
                return <RuleGraph />;
        }
    };

    return getCurrentEditorRulePerformance();
};

export default EditorActiveRulesPage;
