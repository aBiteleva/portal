import React, {useEffect, useMemo, useState} from 'react';
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
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cn = classNames.bind(styles);

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
    const dispatch = useDispatch();
    const {setCurrentActiveRule, updateActiveRule} = useAction();
    const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject'));
    const currentSystemCode = localStorage.getItem('currentSystemCode');

    useEffect(() => {
        currentActiveRuleObject && activeRules.length > 0 &&
        setCurrentActiveRule(activeRules.find(ar => ar.code === currentActiveRuleObject.code));
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

    const eventNodes = useMemo(() => currentActiveRuleObject?.event.map(ev => {
        return {
            id: ev.code,
            label: `${ev.description} - ${ev.categoryEvent} event\n Code: ${ev.code}`,
            shape: getShape(`${ev.categoryEvent} event`),
            color: {background: getColor(`${ev.categoryEvent} event`)},
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300
        };
    }), [currentActiveRuleObject]);

    const conditions = JSON.parse(currentActiveRuleObject?.condition);
    const actions = JSON.parse(currentActiveRuleObject?.action);

    const eventEdges = useMemo(() => currentActiveRuleObject?.event.map(ev => {
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
    }), [currentActiveRuleObject]);

    const conditionNodes = useMemo(() => conditions?.data.map(cond => {
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
    }), [currentActiveRuleObject]);

    const actionNodes = useMemo(() => actions?.data.length > 0 && actions?.data.map(act => {
        return {
            id: act.code,
            label: `${act.description} - ${act.category}\n Code: ${act.code}`,
            shape: getShape(act.category),
            color: {background: getColor(act.category)},
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300
        };
    }), [currentActiveRuleObject]);

    useEffect(() => {
        setState(({graph: {nodes, edges}, counter, ...rest}) => {
            return {
                ...state,
                graph: {
                    nodes: [
                        ...eventNodes,
                        ...actionNodes,
                        ...conditionNodes
                    ],
                    edges: [
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

    const onEditNodeFromAR = async (currentNode, currentActiveRule, data) => {
        if (currentNode.shape === 'box') {
            const actions = JSON.parse(currentActiveRule.action);
            const editedNode = actions.data.find(act => act.code === currentNode.id);
            const newData = actions.data.map(d => {
                if (d.code === editedNode.code) {
                    return {
                        ...editedNode,
                        description: `${data.label}`
                    };
                }
                return {...d};
            });

            const requestBody = {
                description: currentActiveRule.description,
                condition: currentActiveRule.condition,
                action: JSON.stringify({
                    data: [...newData],
                    edges: [...actions.edges]
                }),
                code: currentActiveRule.code
            };

            await dispatch(() => updateActiveRule(requestBody, currentSystemCode));
        }
    };

    const onRemoveNodeFromAR = async (currentNode, currentActiveRule) => {
        if (currentNode.shape === 'box') {
            const actions = JSON.parse(currentActiveRule.action);
            const deletedNode = actions.data.indexOf(actions.data.find(act => act.code === currentNode.id));
            actions.data.splice(deletedNode, 1);
            const requestBody = {
                description: currentActiveRule.description,
                condition: currentActiveRule.condition,
                action: JSON.stringify({data: [...actions.data], edges: [...actions.edges]}),
                code: currentActiveRule.code
            };

            await dispatch(() => updateActiveRule(requestBody, currentSystemCode));
        }
    };

    const onRemoveEdgeFromAR = async (currentEdge, currentActiveRule) => {
        const actions = JSON.parse(currentActiveRule.action);
        const deletedEdge = actions.edges.indexOf(actions.edges.filter(ed => ed.from === currentEdge.from)
            .find(ed => ed.to === currentEdge.to));
        actions.edges.splice(deletedEdge, 1);
        const requestBody = {
            description: currentActiveRule.description,
            condition: currentActiveRule.condition,
            action: JSON.stringify({data: [...actions.data], edges: [...actions.edges]}),
            code: currentActiveRule.code
        };
        await dispatch(() => updateActiveRule(requestBody, currentSystemCode));
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

        await dispatch(() => updateActiveRule(requestBody, currentSystemCode));
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
                <div className={cn(commonStyles.rightPanelBlockAction,
                    {deleteDisabled: currentNode && actions.data.length < 2
                            || currentEdge && actions.edges.length < 2})}
                     style={{color: variables.redColor}}>
                    <Icon name="korzina" color={variables.redColor}/>
                    <div
                        className={commonStyles.rightPanelBlockActionText}
                        onClick={() => !currentNode
                            ? actions.edges.length > 1 && (
                                onRemoveEdgeFromAR(currentEdge, currentActiveRuleObject),
                                    onRemoveEdge(state, setState, currentEdge),
                                    setCurrentEdgeId(undefined)
                            )
                            : actions.data.length > 1 && (
                                onRemoveNode(state, setState, currentNode),
                                    onRemoveNodeFromAR(currentNode, currentActiveRuleObject),
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
                onEditNodeFromAR(currentNode, currentActiveRuleObject, data);
                setIsEditGraphModalVisible(false);
            }}
            isVisible={isEditGraphModalVisible}
            onCancel={() => setIsEditGraphModalVisible(false)}
        />
        <AddEdgeModal
            nodesState={state.graph.nodes}
            node={currentNode}
            onOk={data => {
                onAddEdgeInAR(data, currentActiveRuleObject);
                onAddEdge(data, setState);
                setIsAddEdgeModalVisible(false);
            }}
            isVisible={isAddEdgeModalVisible}
            onCancel={() => setIsAddEdgeModalVisible(false)}
        />
        <AddActionModal
            currentSystemCode={currentSystemCode}
            graphState={state.graph}
            currentActiveRule={currentActiveRuleObject}
            isVisible={isAddActionModalVisible}
            onCancel={() => setIsActionModalVisible(false)}
        />
    </MainTemplate>;
};

export default EditorRuleGraph;
