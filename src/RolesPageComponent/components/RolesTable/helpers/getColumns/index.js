import styles from "../../styles.module.css";
import ActionCell from "./components/ActionCell";

export const getColumns = props => {

    const {
        onEdit,
        onDelete,
        errorMessage
    } = props;

    return [
        {
            title: ()=><div className={styles.columnHeader}>Почта</div>,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Роли',
            dataIndex: 'roles',
            key: 'role',
            width: '425px',
            render: (roles)=>{
                return roles?.map(role=><div key={role} className={styles.rolesColumn}>{role}</div>)
            }
        },
        {
            title: '',
            key: 'Actions',
            dataIndex: 'id',
            width: '180px',
            render: (id, row)=><ActionCell id={id} row={row} onEdit={onEdit} onDelete={onDelete} errorMessage={errorMessage}/>
        }
    ];
}
