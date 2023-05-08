import React from 'react';
import {Select} from "antd";
import {useAction} from "../../../../hooks/useAction";
import {setCurrentPerformance} from "../../../../store/action-creators/activeRules";

const PerformanceSelect = () => {
    const {setCurrentPerformance} = useAction();

  return <>
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
    </>;
};

export default PerformanceSelect;
