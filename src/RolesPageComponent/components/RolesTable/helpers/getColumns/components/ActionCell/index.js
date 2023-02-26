import styles from "../../../../styles.module.css";
import {Button} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import AddNewUserModal from "../../../../../AddNewUserModal";
import DeleteUserModal from "../../../../../DeleteUserModal";
import {useState} from "react";

const ActionCell = props => {
    const {
        id,
        row,
        onEdit,
        onDelete,
        errorMessage
    } = props;

    const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
    const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] = useState(false);

    return <div className={styles.iconColumn}>
        <Button icon={<EditOutlined />} type="primary" className={styles.leftButton} onClick={()=>setIsEditUserModalVisible(true)}/>
        <AddNewUserModal isVisible={isEditUserModalVisible} onOk={onEdit} onCancel={()=>setIsEditUserModalVisible(false)} user={row} mode="Edit" errorText={errorMessage}/>
        <Button icon={<DeleteOutlined />} type="primary" danger className={styles.rightButton} onClick={()=>setIsDeleteUserModalVisible(true)}/>
        <DeleteUserModal isVisible={isDeleteUserModalVisible} user={row} onDelete={()=>{
            setIsDeleteUserModalVisible(false);
            onDelete(id)
        }} onCancel={()=>setIsDeleteUserModalVisible(false)}/>
    </div>
};

export default ActionCell;
