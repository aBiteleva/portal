import React, {FC, useEffect, useMemo} from 'react';
import styles from './styles.module.scss';
import {Button, Form, Input, Modal} from 'antd';
import Select from 'react-select';
import {useAction} from '../../../../hooks/useAction';
import {useAppDispatch, useTypedSelector} from '../../../../hooks/useTypedSelector';

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

    const onFinish = async (data: {
        description: string,
        contextParamCode: { label: string, value: string },
        codeComponent: { label: string, value: string },
    }) => {
        const requestData = {
            ...data,
            contextParamCode: data.contextParamCode.value,
            codeComponent: data.codeComponent.value
        };

        await dispatch(() => addEvent(requestData, currentSystemCode));

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
                    <Select
                        id="events-select-context"
                        options={contextParamsOptions}
                    />
                </Form.Item>
                <Form.Item label="Компонент"
                           name="codeComponent"
                           rules={[{required: true, message: 'Выберите компонент'}]}>
                    <Select options={componentOptions}
                            id="events-select-component"
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>;
};

export default AddEventModal;
