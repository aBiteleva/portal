import React from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";

const RuleTable = () => {

    return <>
        <div className={commonStyles.elementsContainer}>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    </>;
};

export default RuleTable;
