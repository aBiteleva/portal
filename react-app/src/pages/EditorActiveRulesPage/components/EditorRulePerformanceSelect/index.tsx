import React from 'react';
import {Select} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {EditorRulesPerformance} from '../../../../store/types/editorActiveRulesTypes';
import {useNavigate} from 'react-router-dom';

const EditorRulePerformanceSelect = () => {
    const {setCurrentEditorRulePerformance} = useAction();
    const {currentEditorRulePerformance} = useTypedSelector(store => store.editorActiveRulesValues);
    const navigate = useNavigate();

    return <>
      <Select
          placeholder="Представление"
          size="small"
          onChange={value => {
              setCurrentEditorRulePerformance(value);
              if(value === EditorRulesPerformance.lang){
                  navigate('/active-rules-script');
              } else {
                  navigate('/editor-active-rules');
              }
          }}
          value={currentEditorRulePerformance}
          options={[
              {value: 'graph', label: 'Графовое'},
              {value: 'list', label: 'Списочное'},
              {value: 'lang', label: 'Языковое'}
          ]}
      />
    </>;
};

export default EditorRulePerformanceSelect;
