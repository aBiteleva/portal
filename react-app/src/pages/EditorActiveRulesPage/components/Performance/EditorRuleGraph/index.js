import React, {useEffect, useMemo, useState} from 'react';
import commonStyles from '../../../../../common/styles/styles.module.scss';
import GraphComponent from './components/GraphComponent';
import EditorRulePerformanceSelect from '../../EditorRulePerformanceSelect';
import {getColor, getShape} from './helpers/handlers';
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
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import {onAddEdgeInAR, onEditNodeFromAR, onRemoveEdgeFromAR, onRemoveNodeFromAR} from '../../../helpers';

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
    const {setCurrentActiveRule} = useAction();
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
            },
        }
    });

    const eventNodes = useMemo(() => currentActiveRuleObject?.event.map(ev => {
        return {
            id: ev.code,
            title: `Code ${ev.code}`,
            label: `${ev.description} - ${ev.categoryEvent[0].toUpperCase()}E`,
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
            title: `Code ${cond.code}`,
            font: {
                color: 'transparent',
            },
            label: `${cond.description} - ${cond.category[0]}\n`,
            shape: getShape(cond.category),
            color: {background: getColor(cond.category)},
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300
        };
    }), [currentActiveRuleObject]);

    const actionNodes = useMemo(() => actions?.data.length > 0 && actions?.data.map(act => {
        return {
            id: act.code,
            title: `Code ${act.code}`,
            label: `${act.description} - ${act.category[0].toUpperCase()}`,
            shape: getShape(act.category),
            color: {background: getColor(act.category)},
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300
        };
    }), [currentActiveRuleObject]);

    useEffect(() => {
        setState(({graph, counter, ...rest}) => {
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
                                onRemoveEdgeFromAR(currentEdge),
                                    // onRemoveEdge(state, setState, currentEdge),
                                    setCurrentEdgeId(undefined)
                            )
                            : actions.data.length > 1 && (
                                // onRemoveNode(state, setState, currentNode),
                                    onRemoveNodeFromAR(currentNode.id),
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

    return <MainTemplate blocks={<RulesGraphRightPanel/>} id="editor-active-rules-container">
        <RuleGraphToolbar/>
        <GraphComponent
            graphData={state}
        />
        <EditNodeModal
            node={currentNode}
            onEdit={data => {
                // onEdit(data, state, setState, currentNode, currentPointer);
                onEditNodeFromAR(currentNode.id, data.label);
                setIsEditGraphModalVisible(false);
            }}
            isVisible={isEditGraphModalVisible}
            onCancel={() => setIsEditGraphModalVisible(false)}
        />
        <AddEdgeModal
            nodesState={state.graph.nodes}
            node={currentNode}
            onOk={data => {
                onAddEdgeInAR(data);
                // onAddEdge(data, setState);
                setIsAddEdgeModalVisible(false);
            }}
            isVisible={isAddEdgeModalVisible}
            onCancel={() => setIsAddEdgeModalVisible(false)}
        />
        <AddActionModal
            currentSystemCode={currentSystemCode}
            currentActiveRule={currentActiveRuleObject}
            isVisible={isAddActionModalVisible}
            onCancel={() => setIsActionModalVisible(false)}
        />
    </MainTemplate>;
};

export default EditorRuleGraph;
