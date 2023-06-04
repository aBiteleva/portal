import React, {useEffect, useState} from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import GraphComponent from './components/GraphComponent';
import EditorRulePerformanceSelect from '../../EditorRulePerformanceSelect';
import {createNode, getColor, getShape, onAddEdge, onEdit, onOk, onRemoveEdge, onRemoveNode} from './helpers/handlers';
import {Select} from 'antd';
import EditNodeModal from './components/EditNodeModal';
import AddEdgeModal from './components/AddEdgeModal';
import Icon from '../../../../../common/components/Icon';
import variables from '../../../../../../variables.module.scss';
import MainTemplate from '../../../../../common/MainTemplate';
import Header from '../../../../../common/components/Header';
import Managing from '../../../../ActiveRulesPage/components/RightPanel/Managing';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';

const EditorRuleGraph = () => {
    const [currentNodeId, setCurrentNodeId] = useState();
    const [currentNode, setCurrentNode] = useState();
    const [currentEdgeId, setCurrentEdgeId] = useState();
    const [currentEdge, setCurrentEdge] = useState();
    const [currentPointer, setCurrentPointer] = useState({x: 0, y: 0});
    const [isEditGraphModalVisible, setIsEditGraphModalVisible] = useState(false);
    const [isAddEdgeModalVisible, setIsAddEdgeModalVisible] = useState(false);
    const {currentActiveRule} = useTypedSelector(state => state.activeRulesValues);

    const [state, setState] = useState({
        counter: 5,
        graph: {
            nodes: [],
            edges: []
        },
        events: {
            select: function ({nodes, edges, pointer: {canvas}}) {
                setCurrentNodeId(undefined);
                setCurrentEdgeId(undefined);
                if (!nodes[0]) {
                    setCurrentEdgeId(edges[0]);
                    setCurrentPointer({x: canvas.x, y: canvas.y});
                } else {
                    setCurrentNodeId(nodes[0]);
                    setCurrentPointer({x: canvas.x, y: canvas.y});
                }
            }
        }
    });

    useEffect(() => {
        const eventNodes = currentActiveRule?.event.map(ev => {
            return {
                id: ev.code,
                label: `${ev.description} - ${ev.categoryEvent} event\n Code: ${ev.code}`,
                shape: getShape(`${ev.categoryEvent} event`),
                color: {background: getColor(`${ev.categoryEvent} event`)},
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300
            };
        });

        const conditions = JSON.parse(currentActiveRule?.condition).data;
        const actions = JSON.parse(currentActiveRule?.action).data;

        const eventEdges = currentActiveRule?.event.map(ev => {
            if(ev.association.typeBind === 'Event to Rule') {
                return {
                    from: ev.code,
                    to: conditions.length > 0 ? conditions[0].code : actions.length > 0 ? actions[0].code : ''
                };
            } else {
                return {
                    from: conditions.length > 0 ? conditions[0].code : actions.length > 0 ? actions[0].code : '',
                    to: ev.code
                };
            }
        });

        const actionNodes = actions?.map(act => {
            return {
                id: act.code,
                label: `${act.description} - ${act.category}\n Code: ${act.code}`,
                shape: getShape(act.category),
                color: {background: getColor(act.category)},
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300
            };
        });

        const conditionNodes = conditions?.map(cond => {
            return {
                id: cond.code,
                font: {
                    color: 'transparent',
                },
                label: `${cond.description} - ${cond.category}\n Code: ${cond.code}`,
                shape: getShape(cond.category),
                color: {background: getColor(cond.category)},
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300
            };
        });

        const actionEdges = actions?.map(act => {
            return {
                from: act.from,
                to: act.to
            };
        });

        const conditionEdges = conditions?.map(cond => {
            return {
                from: cond.from,
                to: cond.to
            };
        });

        setState(({graph: {nodes, edges}, counter, ...rest}) => {
            return {
                ...state,
                graph: {
                    nodes: [
                        ...nodes,
                        ...eventNodes,
                        ...actionNodes,
                        ...conditionNodes
                    ],
                    edges: [
                        ...edges,
                        ...eventEdges,
                        ...actionEdges,
                        ...conditionEdges
                    ]
                },
                ...rest
            };
        });
    }, [currentActiveRule]);

    useEffect(() => {
        setCurrentNode(state?.graph?.nodes.find(node => node.id === currentNodeId));
    }, [currentNodeId, state?.graph?.nodes]);

    useEffect(() => {
        setCurrentEdge(state?.graph?.edges.find(edge => edge.id === currentEdgeId));
    }, [currentEdgeId, state?.graph?.edges]);

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
                        onClick={() => !currentNode
                            ? (
                                onRemoveEdge(state, setState, currentEdge),
                                    setCurrentEdgeId(undefined)
                            )
                            : (
                                onRemoveNode(state, setState, currentNode),
                                    setCurrentNodeId(undefined)
                            )
                        }>
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
                        {value: 'atomic event', label: 'Событие'},
                        {value: 'condition', label: 'Условие'},
                        {value: 'action', label: 'Действие'}
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
                onEdit(data, state, setState, currentNode, currentPointer);
                setIsEditGraphModalVisible(false);
            }}
            isVisible={isEditGraphModalVisible}
            onCancel={() => setIsEditGraphModalVisible(false)}
        />
        <AddEdgeModal
            nodesState={state.graph.nodes}
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
