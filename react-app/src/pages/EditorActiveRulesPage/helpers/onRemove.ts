import {updateActiveRule} from '../../../store/action-creators/activeRules';
import {store} from '../../../portal-react-angular-react-app';

const currentSystemCode = localStorage.getItem('currentSystemCode');
const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '');

export const onRemoveNodeFromAR = async (currentNodeId: string) => {
    const actions = JSON.parse(currentActiveRuleObject.action);
    const deletedNode = actions.data.indexOf(actions.data.find((act: { code: string }) => act.code === currentNodeId));
    actions.data.splice(deletedNode, 1);
    const requestBody = {
        description: currentActiveRuleObject.description,
        condition: currentActiveRuleObject.condition,
        action: JSON.stringify({data: [...actions.data], edges: [...actions.edges]}),
        code: currentActiveRuleObject.code
    };

    currentSystemCode && await store.dispatch(updateActiveRule(requestBody, currentSystemCode));
};
