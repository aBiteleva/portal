import {Button, Form, Input, Modal, Select} from "antd";
import {roleEnum} from "../../../core/enums/roleEnum";
import styles from "./styles.module.css"

const {Option} = Select;

const AddNewUserModal = ({isVisible, onCancel, onOk, user, mode, errorText}) => {

    return <Modal title={mode==="Edit" ? "Редактирование пользователя" : "Добавление нового пользователя"} open={isVisible} onCancel={onCancel} footer={false}>
        <Form
            className={styles.formModal}
            name="AddNewUser"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={data=>{
                mode==="Edit" ? onOk(data, user.id) : onOk(data);
                onCancel();
            }}
            initialValues={mode==="Edit" ? {
                email: user.email,
                password: user.password,
                roles: user.roles
            } :
                {
                    email: '',
                    password: '',
                    roles: []
                }
            }
        >
            <Form.Item
                label="Почта"
                name="email"
                rules={[{ required: true, message: 'Введите корректную электронную почту', type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Введите пароль не меньше 5 символов', min: 5 }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Роли"
                name="roles"
                rules={[{ required: true, message: 'Выберите хотя бы одну роль' }]}
            >
                <Select mode="multiple">
                    {roleEnum.map(role=>
                        <Option key={role.key}>
                            {role.role}
                        </Option>
                    )}
                </Select>
            </Form.Item>

            <div className={styles.errorMessage}>{errorText}</div>

            <Form.Item className={styles.footer}>
                <Button type="primary" htmlType="submit">
                    Ок
                </Button>
            </Form.Item>

        </Form>

    </Modal>
}

export default AddNewUserModal;
