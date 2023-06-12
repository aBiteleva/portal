import React, {FC, useEffect, useMemo} from 'react';
import styles from './styles.module.scss';
import {Button, Form, Input, Modal, Select} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useAppDispatch, useTypedSelector} from '../../../../hooks/useTypedSelector';
import {AddEventInterface} from '../../../../store/types/eventsTypes';
import commonStyles from '../../../../common/styles/styles.module.scss';

interface AddEventModalInterface {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    currentSystemCode: string;
}

const AddEventModal: FC<AddEventModalInterface> = ({isVisible, setIsVisible, currentSystemCode}) => {
    const {addEvent, fetchContextParams, fetchComponentParams} = useAction();
    const {contextParams} = useTypedSelector(store => store.contextParamsValues);
    const {component} = useTypedSelector(store => store.componentValues);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(() => fetchContextParams());
        dispatch(() => fetchComponentParams());
    }, [dispatch]);

    const contextParamsOptions = useMemo(() => {
        return contextParams.map(param => {
            return {
                label: param.name,
                value: param.code
            };
        });
    }, [contextParams]);

    const componentOptions = useMemo(() => {
        return component.map(comp => {
            return {
                label: comp.description,
                value: comp.code
            };
        });
    }, [component]);

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
                <Button type="primary" form="addSystemForm" key="submit" htmlType="submit" id="save-event-button">
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
                    <Input id="events-input-name"/>
                </Form.Item>
                <Form.Item label="Контекст"
                           name="contextParamCode"
                           rules={[{required: true, message: 'Выберите контекст'}]}>
                    <Select className={commonStyles.select}
                            options={contextParamsOptions}
                            id="events-select-context"
                    />
                </Form.Item>
                <Form.Item label="Компонент"
                           name="codeComponent"
                           rules={[{required: true, message: 'Выберите компонент'}]}>
                    <Select className={commonStyles.select}
                            options={componentOptions}
                            id="events-select-component"
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>;
};

export default AddEventModal;
