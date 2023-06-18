import React, {useMemo} from 'react';
import styles from '../../styles.module.scss';
import {BlockType} from '../../types';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Conditions = () => {
    const currentActiveRuleObject = JSON.parse(localStorage.getItem('currentActiveRuleObject') || '{}');
    const actions = JSON.parse(currentActiveRuleObject?.action);
    const conditions = JSON.parse(currentActiveRuleObject?.condition);

    const conditionsArray = useMemo(() => conditions?.data?.map((cond: BlockType) => {
        return {
            code: cond.code,
            description: cond.description,
            category: cond.category
        };
    }), [currentActiveRuleObject]);

    const eventEdges = useMemo(() => currentActiveRuleObject?.event.map((ev: any) => {
        if (ev.association?.typeBind === 'Event to Rule') {
            return {
                from: ev.code,
                to: conditions.data?.length > 0 ? conditions.data[0]?.code : actions.data?.length > 0 ? actions.data[0]?.code : ''
            };
        } else {
            return {
                from: conditions.data?.length > 0 ? conditions.data[0]?.code : actions.data?.length > 0 ? actions.data[0]?.code : '',
                to: ev.code
            };
        }
    }), [currentActiveRuleObject]);

    return <div className={styles.block}>
        <div className={styles.block__title}>Условия</div>
        <div className={styles.block__wrapper}>
            <div className={styles.block__left_stroke}/>
            <div className={styles.card}>
                {conditionsArray?.map((cond: BlockType) => {
                    const filteredEventEdges = eventEdges
                        .filter((event: { from: string, to: string }) => [event.to, event.from]
                            .includes(cond.code))
                        .map((event: { from: string, to: string }) => {
                            if (event.from[0] !== 'c') {
                                return currentActiveRuleObject.event.find((ev: { code: string }) => ev.code === event.from).description;
                            } else if (event.to[0] !== 'c') {
                                return currentActiveRuleObject.event.find((ev: { code: string }) => ev.code === event.to).description;
                            }
                        });

                    const filteredActionEdges = actions.edges
                        .filter((act: { from: string, to: string }) => [act.to, act.from].includes(cond.code))
                        .map((act: { from: string, to: string }) => {
                            if (act.from[0] !== 'c') {
                                return actions.data.find((action: { code: string }) => action.code === act.from)?.description;
                            } else if (act.to[0] !== 'c') {
                                return actions.data.find((action: { code: string }) => action.code === act.to)?.description;
                            }
                        });

                    return <div key={cond.code} className={styles.card__content}>
                        <div>
                            {cond.category &&
                                <div className={cn(styles.card__category, styles.card__category_condition)}>
                                    {cond.category.at(0)?.toUpperCase()}
                                </div>}
                            {cond.description} {cond.code}
                        </div>
                        <div className={styles.card__tags}>
                            Подключенные события: {filteredEventEdges.map((ev: string) =>
                            <div key={ev} className={cn(styles.card__category, styles.card__category_eventTag)}>
                                {ev}
                            </div>
                        )}
                        </div>
                        <div className={styles.card__tags}>
                            Результирующие воздействия: {filteredActionEdges.map((ev: string) =>
                            <div key={ev} className={cn(styles.card__category, styles.card__category_actionTag)}>
                                {ev}
                            </div>
                        )}
                        </div>
                    </div>;
                })}
            </div>
        </div>
    </div>;
};

export default Conditions;
