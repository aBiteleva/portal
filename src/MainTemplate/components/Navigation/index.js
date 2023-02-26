import {Tree} from "antd";
import {DownOutlined} from "@ant-design/icons";
import styles from './styles.module.css'

const Navigation = () => {
    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-2',
                        },
                    ],
                }
            ]
        }
    ]
    // return <Tree
    //     showLine
    //     switcherIcon={<DownOutlined/>}
    //     defaultExpandedKeys={['0-0-0']}
    //     // onSelect={onSelect}
    //     style={styles}
    //     treeData={treeData}
    // />

    return <></>;
};

export default Navigation;
