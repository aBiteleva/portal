import React, {useEffect, useState} from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import GraphComponent from './components/GraphComponent';
import EditorRulePerformanceSelect from '../../EditorRulePerformanceSelect';
import {getColor, getShape, onAddEdge, onEdit, onOk, onRemoveEdge, onRemoveNode} from './helpers/handlers';
import EditNodeModal from './components/EditNodeModal';
import AddEdgeModal from './components/AddEdgeModal';
import Icon from '../../../../../common/components/Icon';
import variables from '../../../../../../variables.module.scss';
import MainTemplate from '../../../../../common/MainTemplate';
import Header from '../../../../../common/components/Header';
import Managing from '../../../../ActiveRulesPage/components/RightPanel/Managing';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';
import AddActionModal from './components/AddActionModal';
import {useAction} from '../../../../../hooks/useAction';
import {useDispatch} from 'react-redux';

const EditorRuleGraph = () => {
    const [currentNodeId, setCurrentNodeId] = useState();
    const [currentNode, setCurrentNode] = useState();
    const [currentEdgeId, setCurrentEdgeId] = useState();
    const [currentEdge, setCurrentEdge] = useState();
    const [currentPointer, setCurrentPointer] = useState({x: 0, y: 0});
    const [isEditGraphModalVisible, setIsEditGraphModalVisible] = useState(false);
    const [isAddEdgeModalVisible, setIsAddEdgeModalVisible] = useState(false);
    const [isAddActionModalVisible, setIsActionModalVisible] = useState(false);
    const {currentActiveRule, activeRules} = useTypedSelector(state => state.activeRulesValues);
    const {currentSystem} = useTypedSelector(state => state.systemsValues);
    const dispatch = useDispatch();
    const {setCurrentActiveRule, updateActiveRule} = useAction();

    useEffect(() => {
        currentActiveRule && activeRules.length > 0 &&
        setCurrentActiveRule(activeRules.find(ar => ar.code === currentActiveRule.code));
    }, [activeRules]);

    const [state, setState] = useState({
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

        const conditions = JSON.parse(currentActiveRule?.condition);
        const actions = JSON.parse(currentActiveRule?.action);

        const eventEdges = currentActiveRule?.event.map(ev => {
            if (ev.association.typeBind === 'Event to Rule') {
                return {
                    from: ev.code,
                    to: conditions.data.length > 0 ? conditions.data[0].code : actions.data.length > 0 ? actions.data[0].code : ''
                };
            } else {
                return {
                    from: conditions.data.length > 0 ? conditions.data[0].code : actions.data.length > 0 ? actions.data[0].code : '',
                    to: ev.code
                };
            }
        });

        const actionNodes = actions?.data.length > 0 && actions?.data.map(act => {
            return {
                id: act.code,
                label: `${act.description} - ${act.category}\n Code: ${act.code}`,
                shape: getShape(act.category),
                color: {background: getColor(act.category)},
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300
            };
        });

        const conditionNodes = conditions?.data.map(cond => {
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
                        ...actions.edges
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

    const onRemoveNodeFromAR = async (currentNode, currentActiveRule) => {
        if (currentNode.shape === 'box') {
            const actions = JSON.parse(currentActiveRule.action);
            actions.data.splice(actions.indexOf(actions.find(act => act.code === currentNode.id)), 1);
            const requestBody = {
                description: currentActiveRule.description,
                condition: currentActiveRule.condition,
                action: JSON.stringify({data: actions, edges: [...actions.edges]}),
                code: currentActiveRule.code
            };

            await dispatch(() => updateActiveRule(requestBody, currentSystem.code));
        }
    };

    const onAddEdgeInAR = async (data, currentActiveRule) => {
        const actions = JSON.parse(currentActiveRule.action);
        if (currentActiveRule.event[0].association.typeBind === 'Event to Rule') {
            if (data.condition) {
                actions.edges.push({from: data.event, to: data.condition});
                actions.edges.push({from: data.condition, to: data.action});
            } else {
                actions.edges.push({from: data.event, to: data.action});
            }
        } else {
            if (data.condition) {
                actions.edges.push({from: data.condition, to: data.event});
                actions.edges.push({from: data.condition, to: data.action});
            } else {
                actions.edges.push({from: data.action, to: data.event});
            }
        }
        const requestBody = {
            description: currentActiveRule.description,
            condition: currentActiveRule.condition,
            action: JSON.stringify({data: actions.data, edges: actions.edges}),
            code: currentActiveRule.code
        };

        await dispatch(() => updateActiveRule(requestBody, currentSystem.code));
    };

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
                                    onRemoveNodeFromAR(currentNode, currentActiveRule),
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
                <div onClick={() => setIsActionModalVisible(true)}>Добавить действие</div>
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
                onAddEdgeInAR(data, currentActiveRule);
                    onAddEdge(data, setState);
                    setIsAddEdgeModalVisible(false);
            }}
            isVisible={isAddEdgeModalVisible}
            onCancel={() => setIsAddEdgeModalVisible(false)}
        />
        <AddActionModal
            currentSystemCode={currentSystem.code}
            graphState={state.graph}
            currentActiveRule={currentActiveRule}
            isVisible={isAddActionModalVisible}
            onCancel={() => setIsActionModalVisible(false)}
        />
    </MainTemplate>;
};

export default EditorRuleGraph;
