import React, {FC} from 'react';
import styles from './styles.module.scss';
import {Button, Form, Input, Modal} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useAppDispatch} from '../../../../hooks/useTypedSelector';
import {AddEventInterface} from '../../../../store/types/eventsTypes';

interface AddEventModalInterface {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    currentSystemCode: string;
}

const AddEventModal: FC<AddEventModalInterface> = ({isVisible, setIsVisible, currentSystemCode}) => {
    const {addEvent} = useAction();
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onFinish = async (data: AddEventInterface) => {
        await dispatch(() => addEvent(data, currentSystemCode));

        setIsVisible(false);
    };

    return <>
        <Modal
            title="Добавить событие"
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
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
                onFinish={onFinish}
                className={styles.form}
            >
                <Form.Item
                    label="Название"
                    name="description"
                    rules={[{required: true, message: 'Заполните поле'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Код контекста"
                    name="contextParamCode"
                    rules={[{required: true, message: 'Заполните поле'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Код компонента"
                    name="codeComponent"
                    rules={[{required: true, message: 'Заполните поле'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    </>;
};

export default AddEventModal;
