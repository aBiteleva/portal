import {updateActiveRule} from '../../store/action-creators/activeRules';
import {store} from '../../portal-react-angular-react-app';

const currentSystemCode = localStorage.getItem('currentSystemCode');
const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '');

export const onRemoveNodeFromAR = async (currentNodeId: string) => {
    const actions = JSON.parse(currentActiveRuleObject.action);
    const deletedNode = actions.data.indexOf(actions.data.find((act: { code: string }) => act.code === currentNodeId));

    actions.edges = actions.edges.filter((edge: { from: string, to: string }) =>
        edge.from !== currentNodeId && edge.to !== currentNodeId);
    actions.data.splice(deletedNode, 1);
    const requestBody = {
        description: currentActiveRuleObject.description,
        condition: currentActiveRuleObject.condition,
        action: JSON.stringify({data: [...actions.data], edges: [...actions.edges]}),
        code: currentActiveRuleObject.code
    };

    currentSystemCode && await store.dispatch(updateActiveRule(requestBody, currentSystemCode));
};

export const onRemoveEdgeFromAR = async (currentEdge: { from: string, to: string }) => {
    const actions = JSON.parse(currentActiveRuleObject.action);
    const deletedEdge = actions.edges.indexOf(actions.edges.filter((ed: { from: string }) => ed.from === currentEdge.from)
        .find((ed: { to: string }) => ed.to === currentEdge.to));
    actions.edges.splice(deletedEdge, 1);
    const requestBody = {
        description: currentActiveRuleObject.description,
        condition: currentActiveRuleObject.condition,
        action: JSON.stringify({data: [...actions.data], edges: [...actions.edges]}),
        code: currentActiveRuleObject.code
    };
    currentSystemCode && await store.dispatch(updateActiveRule(requestBody, currentSystemCode));
};

export const onEditNodeFromAR = async (currentNodeId: string, newLabel: string) => {
    const actions = JSON.parse(currentActiveRuleObject.action);
    const editedNode = actions.data.find((act: {code: string}) => act.code === currentNodeId);
    const newData = actions.data.map((d: {category: string, description: string, code: string}) => {
        if (d.code === editedNode?.code) {
            return {
                ...editedNode,
                description: `${newLabel}`
            };
        }
        return {...d};
    });

    const requestBody = {
        description: currentActiveRuleObject.description,
        condition: currentActiveRuleObject.condition,
        action: JSON.stringify({
            data: [...newData],
            edges: [...actions.edges]
        }),
        code: currentActiveRuleObject.code
    };

    currentSystemCode && await store.dispatch(updateActiveRule(requestBody, currentSystemCode));
};

export const onAddEdgeInAR = async (data: {condition: string, event: string, action: string}) => {
    const actions = JSON.parse(currentActiveRuleObject.action);
    if (currentActiveRuleObject.event[0].association.typeBind === 'Event to Rule') {
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
        description: currentActiveRuleObject.description,
        condition: currentActiveRuleObject.condition,
        action: JSON.stringify({data: actions.data, edges: actions.edges}),
        code: currentActiveRuleObject.code
    };

    currentSystemCode && await store.dispatch(updateActiveRule(requestBody, currentSystemCode));
};
