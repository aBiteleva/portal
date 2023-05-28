import React, {useEffect, useState} from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import GraphComponent from './components/GraphComponent';
import EditorRulePerformanceSelect from '../../EditorRulePerformanceSelect';
import {createNode, getColor, getShape, onAddEdge, onEdit, onOk, onRemoveNode} from './helpers/handlers';
import {Select} from 'antd';
import EditNodeModal from './components/EditNodeModal';
import AddEdgeModal from './components/AddEdgeModal';
import Icon from '../../../../../common/components/Icon';
import variables from '../../../../../../variables.module.scss';
import MainTemplate from '../../../../../common/MainTemplate';
import Header from '../../../../../common/components/Header';
import Managing from '../../../../ActiveRulesPage/components/RightPanel/Managing';

const EditorRuleGraph = () => {
    const [currentNodeId, setCurrentNodeId] = useState();
    const [currentNode, setCurrentNode] = useState();
    const [isEditGraphModalVisible, setIsEditGraphModalVisible] = useState(false);
    const [isAddEdgeModalVisible, setIsAddEdgeModalVisible] = useState(false);
    const [state, setState] = useState({
        counter: 5,
        graph: {
            nodes: [
                {
                    id: 1, label: 'Atomic event\n Id: 1', shape: getShape('Atomic event'),
                    color: {background: getColor('Atomic event')}, x: -20, y: -150
                },
                {
                    id: 2,
                    label: '',
                    shape: getShape('Condition'),
                    color: {background: getColor('Condition')}, x: 50, y: 0
                },
                {
                    id: 3, label: 'Action\nId: 3', shape: getShape('Action'),
                    color: {background: getColor('Action')}, x: -100, y: 150
                },
                {
                    id: 4, label: 'Action\nId: 4', shape: getShape('Action'),
                    color: {background: getColor('Action')}, x: 0, y: 150
                },
                {
                    id: 5, label: 'Action\nId: 5', shape: getShape('Action'),
                    color: {background: getColor('Action')}, x: 100, y: 150
                }
            ],
            edges: [
                {from: 1, to: 2},
                {from: 1, to: 3},
                {from: 2, to: 4},
                {from: 2, to: 5}
            ]
        },
        events: {
            select: function ({nodes, edges}) {
                console.log('Selected nodes:');
                console.log(nodes);
                console.log('Selected edges:');
                console.log(edges);
            },
            click: function ({nodes, edges}) {
                setCurrentNodeId(nodes[0]);
                this.setSelection({nodes, edges});
            },
            doubleClick: ({nodes, edges, pointer: {canvas}}) => {
                createNode(setState, nodes, edges, canvas.x, canvas.y);
            }
        }
    });

    useEffect(() => {
        setCurrentNode(state?.graph?.nodes.find(node => node.id === currentNodeId));
    }, [currentNodeId, state?.graph?.nodes]);

    const RulesGraphRightPanel = () => {
        return (<>
            <div className={commonStyles.rightPanelBlock}>
                <Header/>
                <hr className={commonStyles.line}/>
                <Managing/>
                <hr className={commonStyles.line}/>
                <div className={commonStyles.rightPanelBlockTitle}>Управление элементом</div>
                <div className={commonStyles.rightPanelBlockAction}>
                    <Icon name="plus"/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        onClick={() => setIsAddEdgeModalVisible(true)}>
                        Добавить связь
                    </div>
                </div>
                <div className={commonStyles.rightPanelBlockAction}>
                    <Icon name="edit"/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        onClick={() => setIsEditGraphModalVisible(true)}>
                        Изменить
                    </div>
                </div>
                <div className={commonStyles.rightPanelBlockAction}>
                    <Icon name="info"/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        onClick={() => setIsEditGraphModalVisible(true)}>
                        Информация
                    </div>
                </div>
                <div className={commonStyles.rightPanelBlockAction} style={{color: variables.redColor}}>
                    <Icon name="korzina" color={variables.redColor}/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        onClick={() => onRemoveNode(state, setState, currentNode)}>
                        Удалить
                    </div>
                </div>
            </div>
        </>);
    };

    const RuleGraphToolbar = () => {
        return (
            <div className={commonStyles.toolbar}>
                <EditorRulePerformanceSelect/>
                <Select
                    placeholder="Добавить"
                    size="small"
                    onChange={value => onOk(value, setState)}
                    options={[
                        {value: 'Atomic event', label: 'Событие'},
                        {value: 'Condition', label: 'Условие'},
                        {value: 'Action', label: 'Действие'}
                    ]}
                />
                <div>Легенда</div>
            </div>
        );
    };

    return <MainTemplate blocks={<RulesGraphRightPanel/>}>
        <RuleGraphToolbar/>
        <GraphComponent
            graphData={state}
        />
        <EditNodeModal
            node={currentNode}
            onEdit={data => {
                onEdit(data, state, setState, currentNode);
                setIsEditGraphModalVisible(false);
            }}
            isVisible={isEditGraphModalVisible}
            onCancel={() => setIsEditGraphModalVisible(false)}
        />
        <AddEdgeModal
            node={currentNode}
            onOk={data => {
                onAddEdge(data, setState);
                setIsAddEdgeModalVisible(false);
            }}
            isVisible={isAddEdgeModalVisible}
            onCancel={() => setIsAddEdgeModalVisible(false)}
        />
    </MainTemplate>;
};

export default EditorRuleGraph;
