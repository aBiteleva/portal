import React from 'react';
import {Select} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {setCurrentPerformance} from '../../../../store/action-creators/activeRules';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';

const RulePerformanceSelect = () => {
    const {setCurrentPerformance} = useAction();
    const {currentPerformance} = useTypedSelector(state => state.activeRulesValues);

  return <>
      <Select
          placeholder="Представление"
          size="small"
          onChange={value => setCurrentPerformance(value)}
          value={currentPerformance}
          options={[
              {value: 'tag', label: 'Тэговое'},
              {value: 'table', label: 'Табличное'}
          ]}
      />
    </>;
};

export default RulePerformanceSelect;
