import variables from '../../../../../../../variables.module.scss';

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

function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

export const onOk = (data, setGraphData) => {
    setGraphData(({graph: {nodes, edges}, counter, ...rest}) => {
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

export const createNode = (setGraphData, currentNode, currentEdge, x, y) => {
    const color = randomColor();
    setGraphData(({graph: {nodes, edges}, counter, ...rest}) => {
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


export const onEdit = (data, graphData, setGraphData, currentNode) => {
    setGraphData(({graph: {nodes, edges}, counter, ...rest}) => {
        return {
            ...graphData,
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
};

export const onRemoveNode = (graphData, setGraphData, currentNode) => {
    const temp = graphData.graph.nodes.filter(node => node.id !== currentNode.id);
    setGraphData(({graph: {edges}, ...rest}) => {
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

export const onAddEdge = (data, setGraphData) => {
    setGraphData(({graph: {nodes, edges}, ...rest}) => {
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
};
