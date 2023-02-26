import styles from './styles.module.css'
import {Button} from "antd";
import {DownOutlined, InfoOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import Navigation from "./components/Navigation";

const MainTemplate = ({page, actions, children}) => {

    return <div className={styles.mainTemplate}>
        <div className={styles.header}>
            <div className={styles.userIcons}>
                <div className={styles.icon} style={{
                    marginTop: '8px',
                    marginRight: '-6px'
                }}>
                    <Button type="text" className={styles.iconComponent} >
                        <UserOutlined/>
                    </Button>
                </div>
                <Button type="text" className={styles.iconComponent} style={{
                    marginTop: '4px',
                    marginRight: '-6px'
                }}>
                    <DownOutlined />
                </Button>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.navigationHeader}>
                    <div className={styles.headerText}>
                        Навигация
                    </div>
                    <div className={styles.headerIcons}>
                        <div className={styles.icon}><Button type="text"
                                                             className={styles.iconComponent}><SearchOutlined/></Button>
                        </div>
                        <div className={styles.icon}><Button type="text"
                                                             className={styles.iconComponent}><InfoOutlined/></Button>
                        </div>
                    </div>
                </div>
                <div className={styles.navigationContent}>
                    <Navigation/>
                </div>
            </div>

            <div className={styles.pageContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerText}>
                        {page}
                    </div>
                    <div className={styles.headerIcons}>
                        {actions.map(act => <div className={styles.icon}><Button onClick={act.onClick} type="text"
                                                                                 className={styles.iconComponent}>{act.icon}</Button>
                        </div>)}
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentHeader}></div>
                    {children}
                </div>
            </div>

        </div>

        {/*{children}*/}
    </div>
}

export default MainTemplate;
