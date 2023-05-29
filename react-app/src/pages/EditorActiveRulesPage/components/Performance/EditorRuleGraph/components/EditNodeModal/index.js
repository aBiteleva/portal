import React, {useEffect} from 'react';
import {Button, Input, Modal} from 'antd';
import styles from './styles.module.scss';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';

const EditNodeModal = ({isVisible, onCancel, onEdit, node}) => {

    const {reset, control, handleSubmit} = useForm();

    useEffect(() => {
        reset({
            // eslint-disable-next-line react/prop-types
            label: node?.label
        });

    }, [node]);


    return <Modal title="Редактирование ноды" open={isVisible} onCancel={onCancel} footer={false}>
        <form onSubmit={handleSubmit(onEdit)}>
            <div className={styles.formItem}>
                <div className={styles.formItemTittle}>Лейбл</div>
                <Controller
                    render={({field}) => <Input {...field}/>}
                    name="label"
                    control={control}
                    rules={{required: true}}
                    // eslint-disable-next-line react/prop-types
                    defaultValue={node?.label}
                />
            </div>
            <div className={styles.footer}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    </Modal>;
};

EditNodeModal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onEdit: PropTypes.func,
    node: PropTypes.object
};

export default EditNodeModal;
