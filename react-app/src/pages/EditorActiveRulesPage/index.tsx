import React, {useEffect} from 'react';
import MainTemplate from '../../common/MainTemplate';
import {useAppDispatch, useTypedSelector} from '../../hooks/useTypedSelector';
import RuleGraph from './components/Performance/EditorRuleGraph/index';
import RightPanel from '../ActiveRulesPage/components/RightPanel';
import {EditorRulesPerformance} from '../../store/types/editorActiveRulesTypes';
import EditorRulePerformanceSelect from './components/EditorRulePerformanceSelect';
import {useAction} from '../../hooks/useAction';
import EditorRuleList from './components/Performance/EditorRuleList';
import {setCurrentEditorRulePerformance} from '../../store/action-creators/editorActiveRules';
import commonStyles from '../../common/styles/styles.module.scss';

const EditorActiveRulesPage = ({isLang}: {isLang: boolean}) => {
    const {currentEditorRulePerformance} = useTypedSelector(state => state.editorActiveRulesValues);
    const {currentActiveRule, activeRules} = useTypedSelector(state => state.activeRulesValues);
    const {systemPagesWay} = useTypedSelector(state => state.systemsValues);
    const {setSystemPagesWay} = useAction();

    useEffect(() => {
        if(currentActiveRule) {
            setSystemPagesWay([...systemPagesWay, {
                name: ` / ${currentActiveRule.description}`,
                code: currentActiveRule.code,
                systems: activeRules
            }]);
        }

    }, []);

    useEffect(() => {
        isLang && setCurrentEditorRulePerformance(EditorRulesPerformance.lang);
    }, [isLang]);

    const getCurrentEditorRulePerformance = () => {
        switch (currentEditorRulePerformance) {
            case EditorRulesPerformance.list:
                return <EditorRuleList />;
            case EditorRulesPerformance.lang:
                return <MainTemplate blocks={<RightPanel/>}>
                    <div className={commonStyles.toolbar}>
                        <EditorRulePerformanceSelect/>
                    </div>
                </MainTemplate>;
            case EditorRulesPerformance.graph:
                return <RuleGraph />;
        }
    };

    return getCurrentEditorRulePerformance();
};

export default EditorActiveRulesPage;
