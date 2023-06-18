import React from 'react';
import MainTemplate from '../../../../../common/MainTemplate';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import Header from '../../../../../common/components/Header';
import Managing from '../../../../ActiveRulesPage/components/RightPanel/Managing';
import Icon from '../../../../../common/components/Icon';
import variables from '../../../../../../variables.module.scss';
import Events from './components/Events';
import Conditions from './components/Conditions';
import Actions from './components/Actions';
import EditorRulePerformanceSelect from '../../EditorRulePerformanceSelect';

const EditorRuleList = ({}) => {
    const RulesListRightPanel = () => {
        return (<>
            <div className={commonStyles.rightPanelBlock}>
                <Header/>
                <hr className={commonStyles.line}/>
                <Managing/>
                <hr className={commonStyles.line}/>
                <div className={commonStyles.rightPanelBlockTitle}>Управление элементом</div>
                <div className={commonStyles.rightPanelBlockAction}>
                    <Icon name="edit"/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        // onClick={() => setIsEditGraphModalVisible(true)}
                    >
                        Изменить
                    </div>
                </div>
                <div className={commonStyles.rightPanelBlockAction}>
                    <Icon name="info"/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        // onClick={() => setIsEditGraphModalVisible(true)}
                    >
                        Информация
                    </div>
                </div>
                <div className={commonStyles.rightPanelBlockAction
                    // {deleteDisabled: currentNode && actions.data.length < 2
                    //         || currentEdge && actions.edges.length < 2}
                }
                     style={{color: variables.redColor}}>
                    <Icon name="korzina" color={variables.redColor}/>
                    <div className={commonStyles.rightPanelBlockActionText}>
                        Удалить
                    </div>
                </div>
            </div>
        </>);
    };

    return <MainTemplate blocks={<RulesListRightPanel/>} id="editor-active-rules-container">
        <div className={commonStyles.toolbar}>
            <EditorRulePerformanceSelect/>
        </div>
        <Events/>
        <Conditions/>
        <Actions/>
    </MainTemplate>;
};

export default EditorRuleList;
