import RolesTable from "./components/RolesTable";
import { PlusOutlined } from '@ant-design/icons';
import AddNewUserModal from "./components/AddNewUserModal";
import {useState} from "react";
import {getRolesData} from "../core/store/rolesStore";
import MainTemplate from "../MainTemplate/index2";

const RolesPageComponent = () => {
    const [dataSource, setDataSource] = useState(getRolesData());
    const [isAddNewUserModalVisible, setIsAddNewUserModalVisible] = useState(false);
    const [errorText, setErrorText] = useState("");

    const onOk = (data) => {
        let temp = dataSource.length>0 ? dataSource: [dataSource];
        data["id"] = Math.random();
        if(temp.find(elem=>elem.email===data.email)){
            setErrorText("Пользователь с таким email уже существует");
            return;
        }
        temp.push(data);
        setDataSource(temp);
        setIsAddNewUserModalVisible(false)
    };

    const onCancel = () => {
        setIsAddNewUserModalVisible(false)
    };

    const onDelete = id => {
        let temp = dataSource.length>0 ? dataSource: [dataSource];
        temp.splice(temp.indexOf(temp.find(elem=>elem.id===id)), 1);
        setDataSource(temp);
    }

    const onEdit = (data, id) => {
        let temp = dataSource.length>0 ? dataSource: [dataSource];
        if(temp.find(elem=>elem.email===data.email)){
            setErrorText("Пользователь с таким email уже существует");
            return;
        }
        let currentElem = temp.find(elem=>elem.id===id);
        temp.splice(temp.indexOf(currentElem), 1);
        data["id"]=currentElem.id;
        temp.push(data);
        setDataSource(data);
        setIsAddNewUserModalVisible(false);
    }

    return <MainTemplate page="Управление ролями" actions={[{
        icon: <PlusOutlined />,
        onClick: ()=>setIsAddNewUserModalVisible(true)
    }]}>
        <AddNewUserModal isVisible={isAddNewUserModalVisible} onOk={onOk} onCancel={onCancel} mode="Add" errorText={errorText}/>
        <RolesTable dataSource={dataSource} onDelete={onDelete} onEdit={onEdit} errorText={errorText}/>
    </MainTemplate>
};

export default RolesPageComponent;
