import React from 'react';
// @ts-ignore
import commonStyles from '../../../../common/styles/styles.module.scss';
import {Select} from "antd";
import {setCurrentPerformance} from "../../../../store/action-creators/activeRules";
import {useAction} from "../../../../hooks/useAction";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {RulesPerformance} from "../../../../store/types/activeRulesTypes";

const Toolbar = () => {
    const {setCurrentPerformance} = useAction();
    const {currentPerformance} = useTypedSelector(state => state.activeRulesValues)

    const getExtraAction = () => {
        switch (currentPerformance) {
            case RulesPerformance.graph:
                return <>
                    <Select
                        placeholder="Добавить"
                        size="small"
                        onChange={value => setCurrentPerformance(value)}
                        options={[
                            {value: 'event', label: 'Событие'},
                            {value: 'condition', label: 'Условие'},
                            {value: 'action', label: 'Действие'}
                        ]}
                    />
                    <div style={{marginRight: '12px'}}>Легенда</div>
                </>
        }
    };

    return (
        <div className={commonStyles.toolbar}>
            {getExtraAction()}
            <Select
                placeholder="Представление"
                size="small"
                onChange={value => setCurrentPerformance(value)}
                options={[
                    {value: 'list', label: 'Списочное'},
                    {value: 'table', label: 'Табличное'},
                    {value: 'lang', label: 'Языковое'},
                    {value: 'graph', label: 'Графовое'}
                ]}
            />
        </div>
    );
};

export default Toolbar;
