import {Table} from "antd";
import styles from './styles.module.css'
import {getColumns} from "./helpers/getColumns";

const RolesTable = ({dataSource, onDelete, onEdit, errorMessage}) => {

    const columns = getColumns(onEdit, onDelete, errorMessage)
    return <Table className={styles.table} columns={columns} dataSource={dataSource.length>0 ? [...dataSource] : [dataSource]} pagination={false}/>
};

export default RolesTable;
