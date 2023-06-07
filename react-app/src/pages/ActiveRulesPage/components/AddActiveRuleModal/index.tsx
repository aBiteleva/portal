import React, {FC, useMemo} from 'react';
import styles from './styles.module.scss';
import {Button, Form, Input, Modal, Select} from 'antd';
import {useAction} from '../../../../hooks/useAction';
import {useAppDispatch, useTypedSelector} from '../../../../hooks/useTypedSelector';
import commonStyles from '../../../../common/styles/styles.module.scss';

interface AddActiveRuleModalInterface {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    currentSystemCode: string;
}

const AddActiveRuleModal: FC<AddActiveRuleModalInterface> = ({isVisible, setIsVisible, currentSystemCode}) => {
    const {addActiveRule} = useAction();
    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setIsVisible(false);
    };

    const {events} = useTypedSelector(state => state.eventsValues);

    const eventOptions = useMemo(() => events
        .map(ev => {
            return {
                label: `${ev.description} - ${ev.categoryEvent} event\n Code: ${ev.code}`,
                value: ev.code
            };
        }), [events]);

    const onFinish = async (data: {
        description: string, condition: string,
        action: string, codeEvent: string, typeBind: string
    }) => {
        const requestData = {
            description: data.description,
            condition: data.condition ? JSON.stringify({
                data: [
                    {
                        category: 'condition',
                        description: data.condition,
                        code: 'c00001'
                    }
                ]
            }) : '',
            action: JSON.stringify({
                data: [
                    {
                        category: 'action',
                        description: data.action,
                        code: 'a00001',
                    }
                ],
                edges: [
                    {
                        from: 'c00001',
                        to: 'a00001'
                    }
                ]
            })
        };

        const eventData = {
            codeEvent: data.codeEvent,
            typeBind: data.typeBind
        };

        await dispatch(() => addActiveRule(requestData, eventData, currentSystemCode));

        setIsVisible(false);
    };

    return <>
        <Modal
            title="Добавить активное правило"
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
                <Form.Item label="Событие"
                           name="codeEvent"
                           rules={[{required: true, message: 'Выберите событие'}]}>
                    <Select className={commonStyles.select}
                            options={eventOptions}/>
                </Form.Item>

                <Form.Item label="Тип связи"
                           name="typeBind"
                           rules={[{required: true, message: 'Выберите тип связи'}]}>
                    <Select className={commonStyles.select}
                            options={[
                                {
                                    value: 'Event to Rule',
                                    label: 'Событие к правилу'
                                },
                                {
                                    value: 'Rule to Event',
                                    label: 'Правило к событию'
                                }
                            ]}/>
                </Form.Item>
            </Form>
        </Modal>
    </>;
};

export default AddActiveRuleModal;
