import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from "react-redux";
import {Switch} from "antd";
import {mock} from "../../resources/mock";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

const SystemElements = () => {
    const {systems, currentSystem} = useTypedSelector(state => state.systemsValues)
    console.log(systems)

    return <div className={styles.systemElementsContent}>
        {mock.map(element => (
            <div className={styles.element}>
                <div className={styles.text}>
                    <div>{element.Name}</div>
                    <div className={styles.textId}>Id: {element.Id}</div>
                </div>
                <div className={styles.switch}><Switch size='small' checked={element.IsCheck}/></div>
            </div>
        ))}
    </div>
};

export default SystemElements;
