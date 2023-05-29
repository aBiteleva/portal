import React from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {Select} from 'antd';
import {setCurrentPerformance} from '../../../../store/action-creators/activeRules';
import {useAction} from '../../../../hooks/useAction';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {RulesPerformance} from '../../../../store/types/activeRulesTypes';

const Toolbar = () => {
    const {setCurrentPerformance} = useAction();

    return (
        <div className={commonStyles.toolbar}>
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
