import React from 'react';
// @ts-ignore
import commonStyles from '../../../../../common/styles/styles.module.scss';
import {Table} from "antd";
import {columns} from "./resources/columns";
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";

const RuleTable = () => {
    const {activeRules} = useTypedSelector(state => state.activeRulesValues);

    return <>
        <div className={commonStyles.elementsContainer}>
            <Table dataSource={activeRules} columns={columns} pagination={false}/>
        </div>
    </>;
};

export default RuleTable;
