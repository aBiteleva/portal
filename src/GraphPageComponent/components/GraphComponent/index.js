import React, {useState} from "react";
import Graph from "react-graph-vis";
import AddNewNodeModal from "../AddNewNodeModal";
import EditNodeModal from "../EditNodeModal";

const options = {
    layout: {
        improvedLayout: true,
        hierarchical: false,
        // hierarchical: {
            // direction: 'UD',
            // sortMethod: 'directed'
        // }
    },
    physics: {
        enabled: false
    },
    interaction: {hover: true},
    nodes: {
        shape: 'image',
        image: 'http://ryanchristiani.com/wp-content/uploads/2015/06/js-logo.png',
        label: 'JS'

    },
    edges: {
        color: "#000000"
    }
};

function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

const GraphComponent = ({
                            isEditGraphModalVisible,
                            setIsEditGraphModalVisible,
                            isAddNewNodeModalVisible,
                            setIsAddNewNodeModalVisible
                        }) => {
        const [currentNode, setCurrentNode] = useState();

        const [state, setState] = useState({
            counter: 5,
            graph: {
                nodes: [
                    {id: 1, label: "Event 1", color: "#e04141", x: -20, y: -150},
                    {id: 2, label: "Event 2", color: "#e09c41", x: 50, y: 0},
                    {id: 3, label: "Event 3", color: "#e0df41", x: -100, y: 150},
                    {id: 4, label: "Event 4", color: "#7be041", x: 0, y: 150},
                    {id: 5, label: "Event 5", color: "#41e0c9", x: 100, y: 150}
                ],
                edges: [
                    {from: 1, to: 2},
                    {from: 1, to: 3},
                    {from: 2, to: 4},
                    {from: 2, to: 5}
                ]
            },
            events: {
                select: function ({nodes, edges, pointer: {canvas}}) {
                    console.log("Selected nodes:");
                    console.log(nodes);
                    console.log("Selected edges:");
                    console.log(edges);
                },
                click: function ({nodes, edges}) {
                    this.setSelection({nodes, edges});
                },
                doubleClick: ({nodes, edges, pointer: {canvas}}) => {
                    createNode(nodes, edges, canvas.x, canvas.y);
                },
                oncontext: function (obj) {
                    setIsEditGraphModalVisible(true);
                    setCurrentNode(state.graph.nodes.find(node => node.id === this.getNodeAt(obj.pointer.DOM)));
                },
            }
        })

        const onOk = data => {
            setIsAddNewNodeModalVisible(false);

            const parentElem = state.graph.nodes.find(node => node.id === Number(data.parent));

            const getShape = () => {
                if (data.type === 'event') {
                    return "circle";
                }

                if (data.type === "action") {
                    return 'box';
                }

                return data.shape;
            }

            setState(({graph: {nodes, edges}, counter, ...rest}) => {
                const id = counter + 1;
                return {
                    graph: {
                        nodes: [
                            ...nodes,
                            {
                                id,
                                label: data.label,
                                color: data.color,
                                x: parentElem.x,
                                y: parentElem.y,
                                shape: getShape(),
                                image: data.image
                            }
                        ],
                        edges: [
                            ...edges,
                            {from: parentElem.id, to: id},
                            data.child ? {from: id, to: data.child} : null
                        ]
                    },
                    counter: id,
                    ...rest
                }
            });
        }

        const onEdit = data => {
            setIsEditGraphModalVisible(false);
            setState(({graph: {nodes, edges}, counter, ...rest}) => {
                return {
                    ...state,
                    graph: {
                        nodes: [
                            ...nodes,
                            {...currentNode, label: data.label, color: data.color},
                        ],
                        edges: [
                            ...edges
                        ]
                    }
                }
            });
        };

        const createNode = (currentNode, currentEdge, x, y) => {
            const color = randomColor();
            setState(({graph: {nodes, edges}, counter, ...rest}) => {
                const id = counter + 1;
                return {
                    graph: {
                        nodes: [
                            ...nodes,
                            {id, label: `Event ${id}`, color, x, y}
                        ],
                        edges: [
                            ...edges,
                            {from: currentNode[0], to: id}
                        ]
                    },
                    counter: id,
                    ...rest
                }
            });
        }

        const {graph, events} = state;

        return <>
            <Graph graph={graph} options={options} events={events} style={{height: "640px"}}/>
            <AddNewNodeModal isVisible={isAddNewNodeModalVisible} onOk={onOk}
                             onCancel={() => setIsAddNewNodeModalVisible(false)} state={state}/>
            <EditNodeModal isVisible={isEditGraphModalVisible} onEdit={onEdit}
                           onCancel={() => setIsEditGraphModalVisible(false)} node={currentNode}/>
        </>
    }
;

export default GraphComponent;
