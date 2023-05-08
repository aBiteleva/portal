import React, {useState} from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
import GraphComponent from "./components/GraphComponent";
import {useAction} from "../../../../../hooks/useAction";
import PerformanceSelect from "../../PerformanceSelect";

const RuleGraph = () => {
    return <>
        <div className={commonStyles.toolbar}>
            <PerformanceSelect/>
        </div>
        <GraphComponent/>
    </>;
};

export default RuleGraph;
