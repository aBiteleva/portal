import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import MainTemplate from "../MainTemplate";
import GraphComponent from "./components/GraphComponent";

const GraphPageComponent = () => {
    const [isEditGraphModalVisible, setIsEditGraphModalVisible] = useState(false);
    const [isAddNewNodeModalVisible, setIsAddNewNodeModalVisible] = useState(false);

    return (
        <MainTemplate page="Графовое отображение" actions={[{
            icon: <PlusOutlined/>,
            onClick: () => setIsAddNewNodeModalVisible(true)
        }]}>
            <GraphComponent isEditGraphModalVisible={isEditGraphModalVisible} setIsEditGraphModalVisible={setIsEditGraphModalVisible}
                                isAddNewNodeModalVisible={isAddNewNodeModalVisible }setIsAddNewNodeModalVisible={setIsAddNewNodeModalVisible}/>
        </MainTemplate>
    );
};

export default GraphPageComponent;
