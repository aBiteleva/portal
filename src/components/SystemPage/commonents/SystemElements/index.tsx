import React from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import { useSelector } from "react-redux";
import {Switch} from "antd";
import {mock} from "../../resources/mock";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";

const SystemElements = () => {
    const {systems, currentSystem} = useTypedSelector(state => state.systemsValues)
    console.log(systems)

    return <div className={commonStyles.elementsContainer}>
        {mock.map(element => (
            <div className={commonStyles.element} key={element.Id}>
                <div className={commonStyles.text}>
                    <div>{element.Name}</div>
                    <div className={commonStyles.textId}>Id: {element.Id}</div>
                </div>
                <div className={commonStyles.switch}><Switch size='small' checked={element.IsCheck}/></div>
            </div>
        ))}
    </div>
};

export default SystemElements;
