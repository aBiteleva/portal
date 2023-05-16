import React from 'react';
import {Select} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';

const EditorRulePerformanceSelect = () => {
    const {setCurrentEditorRulePerformance} = useAction();

    return <>
      <Select
          placeholder="Представление"
          size="small"
          onChange={value => setCurrentEditorRulePerformance(value)}
          options={[
              {value: 'graph', label: 'Графовое'},
              {value: 'list', label: 'Списочное'},
              {value: 'lang', label: 'Языковое'}
          ]}
      />
    </>;
};

export default EditorRulePerformanceSelect;
