import React, {useEffect} from 'react';
import {Button, Input, Modal} from 'antd';
import styles from './styles.module.scss';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';

const AddEdgeModal = ({isVisible, onCancel, onOk}) => {

    const {reset, control, handleSubmit, register} = useForm({
        parent: '',
        child: ''
    });

    useEffect(() => {
        reset({
            parent: '',
            child: ''
        });
    }, []);

    return <Modal title="Добавление связи" open={isVisible} onCancel={onCancel} footer={false}>
        <form onSubmit={handleSubmit(onOk)} className={styles.formModal}>
            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Родитель</div>
                <Controller
                    render={({field}) =>
                        <Input
                            {...register('parent', {
                                required: 'Введите номер родителя',
                            })}
                            {...field}
                        />}
                    name="parent"
                    control={control}
                    defaultValue=""
                />
            </div>

            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Ребенок</div>
                <Controller
                    render={({field}) =>
                        <Input {...field}/>}
                    name="child"
                    control={control}
                    defaultValue=""
                />
            </div>

            <div className={styles.footer}>
                <Button type="primary" htmlType="submit">
                    Создать
                </Button>
            </div>
        </form>
    </Modal>;
};

AddEdgeModal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
};

export default AddEdgeModal;
