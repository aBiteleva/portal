import React, {useEffect, useMemo} from 'react';
import {Button, Modal, Select} from 'antd';
import styles from './styles.module.scss';
import commonStyles from '../../../../../../../common/styles/styles.module.scss';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useAppDispatch, useTypedSelector} from '../../../../../../../hooks/useTypedSelector';
import {useAction} from '../../../../../../../hooks/useAction';

const AddEdgeModal = ({isVisible, onCancel, onOk, nodesState}) => {

    const {reset, control, handleSubmit, register, watch} = useForm({
        action: '',
        condition: '',
        event: ''
    });

    const watchEvent = watch('event');
    const watchAction = watch('action');
    const {events} = useTypedSelector(state => state.eventsValues);
    const dispatch = useAppDispatch();
    const {fetchEventsBySystemCode} = useAction();
    const currentSystemCode = localStorage.getItem('currentSystemCode');

    useEffect(() => {
        reset({
            action: '',
            condition: '',
            event: ''
        });
    }, []);

    useEffect(() => {
        if(!events || events.length < 1) {
            dispatch(() => fetchEventsBySystemCode(currentSystemCode || currentSystemCode));
        }
    }, []);

    const eventOptions = useMemo(() => events
        .map(ev => {
            return {
                label: `${ev.description} - ${ev.categoryEvent[0].toUpperCase()}E`,
                value: ev.code
            };
        }), [events]);

    const conditionOptions = nodesState
        .filter(node => node.label.toLowerCase().includes('condition'))
        .map(conditionNode => {
            return {
                label: conditionNode.label,
                value: conditionNode.id
            };
        });

    const actionOptions = nodesState
        .filter(node => node.label.toLowerCase().includes('action'))
        .map(actionNode => {
            return {
                label: actionNode.label,
                value: actionNode.id
            };
        });

    return <Modal title="Добавление связи" open={isVisible} onCancel={onCancel} footer={false}>
        <form onSubmit={handleSubmit(onOk)} className={styles.form__modal}>
            <div className={styles.form__item}>
                <div className={styles.form__tittle}>Событие</div>
                <Controller
                    render={({field}) =>
                        <Select {...register('event', {
                            required: 'Выберите событие',
                        })} className={commonStyles.select} options={eventOptions} {...field}/>}
                    name="event"
                    control={control}
                    defaultValue=""
                />

                <div className={styles.form__tittle}>Условие</div>
                <Controller
                    render={({field}) =>
                        <Select {...register('condition')} className={commonStyles.select}
                                options={[...conditionOptions, {
                                    label: 'Не выбрано',
                                    value: null
                                }]}{...field}/>}
                    name="condition"
                    control={control}
                    defaultValue=""
                />

                <div className={styles.form__tittle}>Действие</div>
                <Controller
                    render={({field}) =>
                        <Select {...register('action', {
                            required: 'Выберите действие',
                        })}
                                className={commonStyles.select}
                                options={actionOptions}
                                {...field}
                        />}
                    name="action"
                    control={control}
                    defaultValue=""
                />
            </div>

            <div className={styles.form__footer}>
                <Button disabled={(!watchEvent || watchEvent === '') || (!watchAction || watchAction === '')}
                        type="primary" htmlType="submit">
                    Создать
                </Button>
            </div>
        </form>
    </Modal>;
};

AddEdgeModal.propTypes = {
    isVisible: PropTypes.bool,
    nodesState: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
};

export default AddEdgeModal;
