import {Button, Modal} from "antd";
import styles from './styles.module.css';

const DeleteUserModal = ({isVisible, onCancel, onDelete, user}) => {
    return <Modal open={isVisible} onCancel={onCancel} footer={false}>
        <div className={styles.header}>Вы действительно хотите удалить пользователя {user.email}?</div>
        <div className={styles.buttons}>
            <Button onClick={onDelete} type="primary" danger className={styles.buttonLeft}>
                Да
            </Button>
            <Button onClick={onCancel} className={styles.buttonRight}>
                Нет
            </Button>
        </div>
    </Modal>
};

export default DeleteUserModal;
