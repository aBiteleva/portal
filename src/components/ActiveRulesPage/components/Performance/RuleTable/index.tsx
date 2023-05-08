import React from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import {Table} from "antd";
import {columns} from "./resources/columns";
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
import PerformanceSelect from "../../PerformanceSelect";

const RuleTable = () => {
    const {activeRules} = useTypedSelector(state => state.activeRulesValues);

    return <>
        <div className={commonStyles.toolbar}>
            <PerformanceSelect />
        </div>
        <div className={commonStyles.elementsContainer}>
            <Table dataSource={activeRules} columns={columns} pagination={false}/>
        </div>
    </>;
};

export default RuleTable;
