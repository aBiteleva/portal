import React from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import GraphComponent from './components/GraphComponent';
import PerformanceSelect from '../../PerformanceSelect';

const RuleGraph = () => {
    return <>
        <div className={commonStyles.toolbar}>
            <PerformanceSelect/>
        </div>
        <GraphComponent/>
    </>;
};

export default RuleGraph;
