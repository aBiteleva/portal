import React from 'react';
import {PlusOutlined} from "@ant-design/icons";
import MainTemplate from "../MainTemplate/index";

const MainPage = () => {
    return <MainTemplate page="Графовое отображение" actions={[{
        icon: <PlusOutlined/>,
        onClick: () => {}
    }]}>
        hello
    </MainTemplate>
};

export default MainPage;
