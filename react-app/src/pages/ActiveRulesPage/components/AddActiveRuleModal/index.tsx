import React, {FC} from 'react';
import styles from './styles.module.scss';
import {Button, Form, Input, Modal} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useAppDispatch} from '../../../../hooks/useTypedSelector';
import {AddActiveRuleInterface} from '../../../../store/types/activeRulesTypes';

interface AddActiveRuleModalInterface {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    currentSystemCode: string;
}

const AddEventModal: FC<AddActiveRuleModalInterface> = ({isVisible, setIsVisible, currentSystemCode}) => {
    const {addActiveRule} = useAction();
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onFinish = async (data: AddActiveRuleInterface) => {
        await dispatch(() => addActiveRule(data, currentSystemCode));

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
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
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
                    label="Условие"
                    name="condition"
                    rules={[{required: true, message: 'Заполните поле'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Действие"
                    name="action"
                    rules={[{required: true, message: 'Заполните поле'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    </>;
};

export default AddEventModal;
