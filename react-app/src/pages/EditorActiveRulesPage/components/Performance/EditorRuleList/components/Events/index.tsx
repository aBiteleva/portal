import React, {useMemo} from 'react';
import styles from '../../styles.module.scss';
import {BlockType} from '../../types';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Events = () => {
    const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '{}');

    const events = useMemo(() => currentActiveRuleObject?.event.map((ev: BlockType) => {
        return {
            code: ev.code,
            description: ev.description,
            categoryEvent: ev.categoryEvent
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
                    </div>)}
            </div>
        </div>
    </div>;
};

export default Events;
