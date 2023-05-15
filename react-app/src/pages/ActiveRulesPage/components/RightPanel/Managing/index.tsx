import React, {useState} from 'react';
import Icon from '../../../../../common/components/Icon';
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import {useAppDispatch, useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {useAction} from '../../../../../hooks/useAction';
import {DeleteActiveRuleInterface} from '../../../../../store/types/activeRulesTypes';
import AddActiveRuleModal from '../../AddActiveRuleModal';

const Managing = () => {
    const [isAddActiveRuleModalVisible, setIsAddActiveRuleModalVisible] = useState(false);
    const {currentActiveRule} = useTypedSelector(state => state.activeRulesValues);
    const {currentSystem} = useTypedSelector(state => state.systemsValues);
    const {deleteActiveRule} = useAction();
    const dispatch = useAppDispatch();

    const onHandleDeleteActiveRule = async () => {
        const body: DeleteActiveRuleInterface = {
            code: currentActiveRule.code
        };

        await dispatch(() => deleteActiveRule(body, currentSystem.code));
    };
    return <>
        <div className={stylesCommon.rightPanelBlockTitle}>Управление</div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="plus"/>
            <div
                className={stylesCommon.rightPanelBlockActionText}
                onClick={() => setIsAddActiveRuleModalVisible(true)}
            >
                Добавить
            </div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="info"/>
            <div className={stylesCommon.rightPanelBlockActionText}>Информация</div>
        </div>
        <div className={stylesCommon.rightPanelBlockAction}>
            <Icon name="korzina"/>
            <div
                className={stylesCommon.rightPanelBlockActionText}
                onClick={onHandleDeleteActiveRule}
            >
                Удалить
            </div>
        </div>
        <AddActiveRuleModal
            isVisible={isAddActiveRuleModalVisible}
            setIsVisible={setIsAddActiveRuleModalVisible}
            currentSystemCode={currentSystem.code}
        />
    </>;
};

export default Managing;
