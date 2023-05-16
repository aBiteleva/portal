import React from 'react';
import {Select} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {setCurrentPerformance} from '../../../../store/action-creators/activeRules';

const RulePerformanceSelect = () => {
    const {setCurrentPerformance} = useAction();

  return <>
      <Select
          placeholder="Представление"
          size="small"
          onChange={value => setCurrentPerformance(value)}
          options={[
              {value: 'tag', label: 'Тэговое'},
              {value: 'table', label: 'Табличное'}
          ]}
      />
    </>;
};

export default RulePerformanceSelect;
