import React, {useMemo} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import commonStyles from '../../../../../../../common/styles/styles.module.scss';
import PropTypes from 'prop-types';
import {useTypedSelector} from '../../../../../../../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {useAction} from '../../../../../../../hooks/useAction';

const AddActionModal = ({isVisible, onCancel, currentActiveRule, graphState, currentSystemCode}) => {

    const {events} = useTypedSelector(state => state.eventsValues);
    const dispatch = useDispatch();
    const {updateActiveRule} = useAction();

    const eventOptions = useMemo(() => events
        .map(ev => {
            return {
                label: `${ev.description} - ${ev.categoryEvent} event\n Code: ${ev.code}`,
                value: ev.code
            };
        }), [events]);

    const conditionOptions = graphState.nodes
        .filter(node => node.label.toLowerCase().includes('condition'))
        .map(conditionNode => {
            return {
                label: conditionNode.label,
                value: conditionNode.id
            };
        });

    const onOk = async (data) => {
        const actionCode = 'a' + Math.round(Math.random() * 100);
        const requestAction = JSON.parse(currentActiveRule.action);
        requestAction.data.push({
            category: 'action',
            description: data.description,
            code: actionCode
        });

        requestAction.edges.push({
            from: data.condition,
            to: actionCode
        });

        const requestBody = {
            description: currentActiveRule.description,
            condition: currentActiveRule.condition,
            action: JSON.stringify({data: requestAction.data, edges: requestAction.edges}),
            code: currentActiveRule.code
        };

        await dispatch(() => updateActiveRule(requestBody, currentSystemCode));
        onCancel();
    };

    return <Modal
        title="Добавление действия"
        open={isVisible}
        onCancel={onCancel}
        footer={[
            <Button type="primary" form="addActionForm" key="submit" htmlType="submit">
                Сохранить
            </Button>
        ]}
    >
        <Form
            name="addActionForm"
            labelCol={{span: 6}}
            wrapperCol={{span: 16}}
            onFinish={onOk}
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
                <Select className={commonStyles.select}
                        options={conditionOptions}/>
            </Form.Item>
        </Form>
    </Modal>;
};

AddActionModal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    currentActiveRule: PropTypes.object,
    graphState: PropTypes.object,
    currentSystemCode: PropTypes.string
};

export default AddActionModal;