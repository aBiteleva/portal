import React from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import {useAppDispatch, useTypedSelector} from '../../../../../hooks/useTypedSelector';
import PerformanceSelect from '../../PerformanceSelect';
import {setCurrentActiveRule} from '../../../../../store/action-creators/activeRules';
import {useAction} from '../../../../../hooks/useAction';
import variables from '../../../../../../variables.module.scss';

const RuleList = () => {
    const {activeRules, currentActiveRule} = useTypedSelector(state => state.activeRulesValues);
    const {setCurrentActiveRule} = useAction();
    const dispatch = useAppDispatch();

    return <>
        <div className={commonStyles.toolbar}>
            <PerformanceSelect/>
        </div>
        <div className={commonStyles.elementsContainer}>
            {activeRules?.map(rule => (
                <div
                    className={commonStyles.element}
                    style={currentActiveRule.code === rule.code
                        ? {
                            background: variables.yellowColor,
                            color: variables.darkBlueColor
                        }
                        : undefined}
                    onClick={() => dispatch(() => setCurrentActiveRule(rule))}
                    key={rule.code}
                >
                    <div className={commonStyles.text}>
                        <div>{rule.description}</div>
                        <div
                            className={commonStyles.textId}
                            style={currentActiveRule.code === rule.code
                                ? {
                                    color: variables.greyColor
                                }
                                : undefined}
                        >
                            Id: {rule.code}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>;
};

export default RuleList;
