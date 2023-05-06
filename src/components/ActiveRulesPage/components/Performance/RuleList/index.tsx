import React from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";

const RuleList = () => {
    const {activeRules} = useTypedSelector(state => state.activeRulesValues);

    return <>
        <div className={commonStyles.elementsContainer}>
            {activeRules?.map(rule => (
                <div className={commonStyles.element} key={rule.code}>
                    <div className={commonStyles.text}>
                        <div>{rule.description}</div>
                        <div className={commonStyles.textId}>Id: {rule.code}</div>
                    </div>
                </div>
            ))}
        </div>
    </>;
};

export default RuleList;
