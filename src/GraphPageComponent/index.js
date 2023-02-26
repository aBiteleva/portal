import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import MainTemplate from "../MainTemplate";
import GraphComponent from "./components/GraphComponent";
import {useEffect} from "react";

const GraphPageComponent = () => {
    const [isEditGraphModalVisible, setIsEditGraphModalVisible] = useState(false);
    const [isAddNewNodeModalVisible, setIsAddNewNodeModalVisible] = useState(false);

    //Не убирать! Нужно для устранения ошибки при ипервом рендере
    //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <MainTemplate page="Графовое отображение" actions={[{
            icon: <PlusOutlined/>,
            onClick: () => setIsAddNewNodeModalVisible(true)
        }]}>
            <GraphComponent isEditGraphModalVisible={isEditGraphModalVisible}
                            setIsEditGraphModalVisible={setIsEditGraphModalVisible}
                            isAddNewNodeModalVisible={isAddNewNodeModalVisible}
                            setIsAddNewNodeModalVisible={setIsAddNewNodeModalVisible}/>
        </MainTemplate>
    );
};

export default GraphPageComponent;
