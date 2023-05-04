import React from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

const Rule = () => {
    const {activeRules} = useTypedSelector(state => state.activeRulesValues);

    return <>
        {/*{mock.map(tag => (*/}
        {/*    <div key={tag.Id} className={styles.tagContainer}>*/}
        {/*        <div className={styles.tagHeader}>*/}
        {/*            <div className={styles.tagName}>*/}
        {/*                <Icon name="tag"/>*/}
        {/*                <div>{tag.Name}</div>*/}
        {/*            </div>*/}
        {/*            <Icon name="arrowDown"/>*/}
        {/*        </div>*/}
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
        {/*    </div>*/}
        {/*))}*/}
    </>;
};

export default Rule;
