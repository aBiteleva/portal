import React, {useMemo, useState} from 'react';
import styles from '../../styles.module.scss';
import {BlockType} from '../../types';
import classNames from 'classnames/bind';
import Icon from '../../../../../../../common/components/Icon';
import AddActionModal from '../../../EditorRuleGraph/components/AddActionModal';
import {onRemoveNodeFromAR} from '../../../../../helpers';
import {useTypedSelector} from '../../../../../../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

const Actions = () => {
    const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '{}');
    const actions = JSON.parse(currentActiveRuleObject?.action);
    const currentSystemCode = localStorage.getItem('currentSystemCode');
    const currentSystemName = localStorage.getItem('currentSystemName');
    const [isAddActionModalVisible, setIsAddActionModalVisible] = useState<boolean>(false);
    const {currentSystem} = useTypedSelector(state => state.systemsValues);

    const actionsArray = useMemo(() => actions?.data.map((cond: BlockType) => {
        return {
            code: cond.code,
            description: cond.description,
            category: cond.category
        };
    }), [currentActiveRuleObject]);

    return <div className={styles.block}>
        <div className={styles.block__title}>Действия</div>
        <div className={styles.block__wrapper}>
            <div className={styles.block__left_stroke}/>
            <div className={styles.card}>
                {actionsArray.map((act: BlockType) => {
                    return <div id={act.code} key={act.code} className={styles.card__content}>
                        <div className={cn(styles.card__withDelete, {card__deleteBlock: actions.data.length<2})}>
                            <div>
                                {act.category &&
                                    <div className={cn(styles.card__category, styles.card__category_action)}>
                                        {act.category.at(0)?.toUpperCase()}
                                    </div>}
                                {act.description} {act.code}
                            </div>
                            <Icon name="korzina" onClick={() => actions.data.length>1 && onRemoveNodeFromAR(act.code)}/>
                        </div>
                        <div className={styles.card__tags}>
                            Исполняемая система:
                            <div className={cn(styles.card__category, styles.card__category_systemTag)}>
                                {currentSystemName}
                            </div>
                        </div>
                    </div>;
                })}
                <div onClick={() => setIsAddActionModalVisible(true)}
                     className={cn(styles.card__content, styles.card__content_add)}>
                    <Icon name="plus"/>Добавить
                </div>
            </div>
        </div>
        <AddActionModal
            currentSystemCode={currentSystemCode}
            currentActiveRule={currentActiveRuleObject}
            isVisible={isAddActionModalVisible}
            onCancel={() => setIsAddActionModalVisible(false)}
        />
    </div>;
};

export default Actions;
