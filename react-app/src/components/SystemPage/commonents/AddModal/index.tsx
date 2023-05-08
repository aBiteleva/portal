import React, {FC} from 'react';
// @ts-ignore
import styles from './styles.module.scss';
import {Button, Form, Input, Modal} from "antd";
import {useAction} from "../../../../hooks/useAction";
import {useAppDispatch} from "../../../../hooks/useTypedSelector";
import {AddSystemInterface} from "../../../../store/types/systemsTypes";

interface AddModalInterface {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const AddModal: FC<AddModalInterface> = ({isVisible, setIsVisible}) => {
    const {addSystem} = useAction();
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setIsVisible(false);
    }

    const onFinish = async (data: AddSystemInterface) => {
        await dispatch(() => addSystem(data));

        setIsVisible(false);
    }

    return <>
        <Modal
            title="Добавить систему"
            open={isVisible}
            onCancel={handleCancel}
            footer={[
                <Button type='primary' form="addSystemForm" key="submit" htmlType="submit">
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
