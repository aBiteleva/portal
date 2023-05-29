import React, {useEffect} from 'react';
import {Button, Input, Modal, Select} from 'antd';
import styles from './styles.module.scss';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';

const AddEdgeModal = ({isVisible, onCancel, onOk, nodesState}) => {

    const {reset, control, handleSubmit, register, watch} = useForm({
        action: '',
        condition: '',
        event: ''
    });

    const watchEvent = watch('event');
    const watchAction = watch('action');

    useEffect(() => {
        reset({
            action: '',
            condition: '',
            event: ''
        });
    }, []);

    const eventOptions = nodesState
        .filter(node => node.label.includes('event'))
        .map(eventNode => {
            return {
                label: eventNode.label,
                value: eventNode.id
            };
        });

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
                        })} className={styles.form__select} options={eventOptions} {...field}/>}
                    name="event"
                    control={control}
                    defaultValue=""
                />

                <div className={styles.form__tittle}>Условие</div>
                <Controller
                    render={({field}) =>
                        <Select {...register('condition')} className={styles.form__select}
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
                                className={styles.form__select}
                                options={actionOptions}{...field}
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
