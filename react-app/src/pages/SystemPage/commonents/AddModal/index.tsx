import React, {FC} from 'react';
import styles from './styles.module.scss';
import {Button, Form, Input, Modal} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useAppDispatch, useTypedSelector} from '../../../../hooks/useTypedSelector';

interface AddModalInterface {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const AddModal: FC<AddModalInterface> = ({isVisible, setIsVisible}) => {
    const {addComponent} = useAction();
    const dispatch = useAppDispatch();
    const {currentSystem} = useTypedSelector(store => store.systemsValues);

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onFinish = async (body: {name: string}) => {
        await dispatch(() => addComponent(body.name, currentSystem.code));

        setIsVisible(false);
    };

    return <>
        <Modal
            title="Добавить систему"
            open={isVisible}
            onCancel={handleCancel}
            footer={[
                <Button type="primary" form="addSystemForm" key="submit" htmlType="submit">
                    Сохранить
                </Button>
            ]}
        >
            <Form
                name="addSystemForm"
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
                onFinish={onFinish}
                className={styles.form}
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{required: true, message: 'Заполните поле'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    </>;
};

export default AddModal;
