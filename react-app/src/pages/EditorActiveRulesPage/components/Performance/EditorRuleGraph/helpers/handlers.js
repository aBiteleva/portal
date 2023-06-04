import variables from '../../../../../../../variables.module.scss';

export const getColor = (type) => {
    switch (type) {
        case 'action':
            return variables.actionColor;
        case 'condition':
            return variables.conditionColor;
        case 'atomic event':
        case 'complex event':
        case 'aggregation event':
            return variables.eventColor;
    }
};

export const getShape = (type) => {
    switch (type) {
        case 'action':
            return 'box';
        case 'condition':
            return 'diamond';
        case 'atomic event':
        case 'complex event':
        case 'aggregation event':
            return 'ellipse';
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
                        label: `${data}\n Id: ${id}`,
                        font: {
                            color: data.toLowerCase().includes('condition') ? 'transparent' : variables.whiteColor,
                        },
                        color: {background: getColor(data)},
                        shape: getShape(data),
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


export const onEdit = (data, graphData, setGraphData, currentNode, currentPointer) => {
    setGraphData(({graph: {edges}, counter, ...rest}) => {
        const temp = graphData.graph.nodes.filter(node => node.id !== currentNode.id);
        return {
            ...graphData,
            graph: {
                nodes: [
                    ...temp,
                    {...currentNode, label: data.label, x: currentPointer.x, y: currentPointer.y},
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
    const temp = graphData.graph.nodes.filter(node => node?.id !== currentNode?.id);
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

export const onRemoveEdge = (graphData, setGraphData, currentEdge) => {
    const temp = graphData.graph.edges.filter(edge => edge?.id !== currentEdge?.id);
    setGraphData(({graph: {nodes}, ...rest}) => {
        return {
            graph: {
                nodes: [
                    ...nodes,
                ],
                edges: [
                    ...temp,
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
                edges: data.condition ? [
                    ...edges,
                    data.event ? {from: data?.event, to: data.condition} : null,
                    data.action ? {from: data?.condition, to: data.action} : null
                ] : [
                    ...edges,
                    data.event && data.action ? {from: data?.event, to: data.action} : null
                ]
            },
            ...rest
        };
    });
};
