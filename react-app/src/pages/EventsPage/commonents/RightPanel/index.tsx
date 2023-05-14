import Header from '../../../../common/components/Header';
import Managing from './Managing';
import React from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';

const RightPanel = () => {
    return <>
        <div className={commonStyles.rightPanelBlock}>
            <Header/>
            <hr className={commonStyles.line}/>
            <Managing/>
        </div>
    </>;
};

export default RightPanel;
