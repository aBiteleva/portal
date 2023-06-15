import React, {useMemo} from 'react';
import styles from '../../styles.module.scss';
import {BlockType} from '../../types';
import classNames from 'classnames/bind';
import {useTypedSelector} from '../../../../../../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

const Events = () => {
    const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '{}');
    const {events: eventsValues} = useTypedSelector(store => store.eventsValues);

    const events = useMemo(() => currentActiveRuleObject?.event.map((ev: BlockType) => {
        const findEvent = eventsValues.find(event => event.code === ev.code);
        return {
            code: ev.code,
            description: ev.description,
            categoryEvent: ev.categoryEvent,
            component: ev?.component,
            contextParam: findEvent?.contextParam
        };
    }), [currentActiveRuleObject]);


    return <div className={styles.block}>
        <div className={styles.block__title}>События</div>
        <div className={styles.block__wrapper}>
            <div className={styles.block__left_stroke}/>
            <div className={styles.card}>
                {events.map((ev: BlockType) =>
                    <div key={ev.code} className={styles.card__content}>
                        <div>
                            {ev.categoryEvent &&
                                <div className={cn(styles.card__category, styles.card__category_event)}>
                                    {ev.categoryEvent.at(0)?.toUpperCase()}E
                                </div>
                            }
                            {ev.description} {ev.code}
                        </div>
                        <div>
                            {ev?.component && <div className={styles.card__tags}>
                                Группа датчика:
                                {ev.component.map(comp => <div
                                    key={comp.description}
                                    className={cn(styles.card__category, styles.card__category_component)}>
                                    {comp.description}
                                </div>)}
                            </div>}
                            {ev?.contextParam && <div className={styles.card__tags}>
                                Контекст:
                                <div className={cn(styles.card__category, styles.card__category_context)}>
                                    {ev.contextParam?.description}
                                </div>
                            </div>}
                        </div>
                    </div>)}
            </div>
        </div>
    </div>;
};

export default Events;
