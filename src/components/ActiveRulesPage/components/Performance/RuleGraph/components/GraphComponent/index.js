import React, {useEffect, useState} from 'react';
import Graph from 'react-graph-vis';
import variables from '../../../../../../../../variables.module.scss';
import {Select} from 'antd';
import commonStyles from '../../../../../../../common/styles/styles.module.scss';
// eslint-disable-next-line import/namespace
import EditNodeModal from '../EditNodeModal';
import AddEdgeModal from '../AddEdgeModal';
import styles from '../../styles.module.scss';
import Icon from '../../../../../../../common/components/Icon';

const options = {
    layout: {
        improvedLayout: false
    },
    nodes: {
        color: {
            border: variables.darkBlueColor,
            background: variables.backgroundColor,
            highlight: {
                background: variables.borderColor
            }
        },
        font: {
            color: variables.whiteColor
        },
        shape: 'box'
    },
    physics: {
        enabled: false
    }
};

function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

const getColor = (type) => {
    switch (type) {
        case 'action':
            return variables.actionColor;
        case 'condition':
            return variables.conditionColor;
        case 'event':
            return variables.eventColor;
    }
};

const GraphComponent = () => {
        const [currentNode, setCurrentNode] = useState();
        const [currentNodeId, setCurrentNodeId] = useState();

        useEffect(() => {
            setCurrentNode(state.graph.nodes.find(node => node.id === currentNodeId));
        }, [currentNodeId, state?.graph.nodes]);

        const [isEditGraphModalVisible, setIsEditGraphModalVisible] = useState(false);
        const [isAddEdgeModalVisible, setIsAddEdgeModalVisible] = useState(false);

        const [state, setState] = useState({
            counter: 5,
            graph: {
                nodes: [
                    {id: 1, label: 'Node 1', x: -20, y: -150},
                    {id: 2, label: 'Node 2', x: 50, y: 0},
                    {id: 3, label: 'Node 3', x: -100, y: 150},
                    {id: 4, label: 'Node 4', x: 0, y: 150},
                    {id: 5, label: 'Node 5', x: 100, y: 150}
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
                    createNode(nodes, edges, canvas.x, canvas.y);
                }
            }
        });

        const onOk = data => {
            setState(({graph: {nodes, edges}, counter, ...rest}) => {
                const id = counter + 1;
                return {
                    graph: {
                        nodes: [
                            ...nodes,
                            {
                                id,
                                label: `${data[0].toUpperCase()}: ${data}`,
                                color: {background: getColor(data)},
                                x: Math.random() * 600 - 300,
                                y: Math.random() * 600 - 300
                            }
                        ],
                        edges: [
                            ...edges,
                        ]
                    },
                    counter: id,
                    ...rest
                };
            });
        };

        const onAddEdge = data => {
            setState(({graph: {nodes, edges}, ...rest}) => {
                return {
                    graph: {
                        nodes: [
                            ...nodes
                        ],
                        edges: [
                            ...edges,
                            data.child && data.parent ? {from: data?.parent, to: data.child} : null
                        ]
                    },
                    ...rest
                };
            });
            setIsAddEdgeModalVisible(false);
        };

        const onEdit = data => {
            setState(({graph: {nodes, edges}, counter, ...rest}) => {
                return {
                    ...state,
                    graph: {
                        nodes: [
                            ...nodes,
                            {...currentNode, label: data.label},
                        ],
                        edges: [
                            ...edges
                        ]
                    },
                    ...rest
                };
            });
            setIsEditGraphModalVisible(false);
        };

        const createNode = (currentNode, currentEdge, x, y) => {
            const color = randomColor();
            setState(({graph: {nodes, edges}, counter, ...rest}) => {
                const id = counter + 1;
                return {
                    graph: {
                        nodes: [
                            ...nodes,
                            {id, label: `Node ${id}`, color, x, y}
                        ],
                        edges: [
                            ...edges,
                            {from: currentNode[0], to: id}
                        ]
                    },
                    counter: id,
                    ...rest
                };
            });
        };

        const onRemoveNode = () => {
            const temp = state.graph.nodes.filter(node => node.id !== currentNode.id);
            setState(({graph: { edges}, ...rest}) => {
                return {
                    graph: {
                        nodes: [
                            ...temp,
                        ],
                        edges: [
                            ...edges,
                        ]
                    },
                    ...rest
                };
            });
        };

        const {graph, events} = state;

        return <>
            <div className={commonStyles.elementsContainer}>
                <div className={commonStyles.toolbarExtra}>
                    <Select
                        placeholder="Добавить"
                        size="small"
                        onChange={value => onOk(value)}
                        options={[
                            {value: 'event', label: 'Событие'},
                            {value: 'condition', label: 'Условие'},
                            {value: 'action', label: 'Действие'}
                        ]}
                    />
                    <div>Легенда</div>
                </div>
                <div className={styles.rightPanelGraph}>
                    <hr className={stylesCommon.line}/>
                    <div className={commonStyles.rightPanelBlock}>
                        <div className={commonStyles.rightPanelBlockTitle}>Управление элементом</div>
                        <div className={stylesCommon.rightPanelBlockAction}>
                            <Icon name="plus"/>
                            <div
                                className={commonStyles.rightPanelBlockActionText}
                                onClick={() => setIsAddEdgeModalVisible(true)}>
                                Добавить связь
                            </div>
                        </div>
                        <div className={stylesCommon.rightPanelBlockAction}>
                            <Icon name="edit"/>
                            <div
                                className={commonStyles.rightPanelBlockActionText}
                                onClick={() => setIsEditGraphModalVisible(true)}>
                                Изменить
                            </div>
                        </div>
                        <div className={stylesCommon.rightPanelBlockAction}>
                            <Icon name="info"/>
                            <div
                                className={commonStyles.rightPanelBlockActionText}
                                onClick={() => setIsEditGraphModalVisible(true)}>
                                Информация
                            </div>
                        </div>
                        <div className={stylesCommon.rightPanelBlockAction} style={{color: variables.redColor}}>
                            <Icon name="korzina"/>
                            <div
                                className={commonStyles.rightPanelBlockActionText}
                                onClick={onRemoveNode}>
                                Удалить
                            </div>
                        </div>
                    </div>
                </div>

                <Graph graph={graph} options={options} events={events} style={{height: '640px', width: '100%'}}/>
                <EditNodeModal
                    node={currentNode}
                    onEdit={onEdit}
                    isVisible={isEditGraphModalVisible}
                    onCancel={() => setIsEditGraphModalVisible(false)}
                />
                <AddEdgeModal
                    node={currentNode}
                    onOk={onAddEdge}
                    isVisible={isAddEdgeModalVisible}
                    onCancel={() => setIsAddEdgeModalVisible(false)}
                />
            </div>
        </>;
    }
;

export default GraphComponent;
