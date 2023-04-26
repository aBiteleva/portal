import React from 'react';
import styles from './styles.module.scss';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {mock} from "../../resources/mock";
import Icon from "../../../../common/components/Icon";
import {Switch} from "antd";

const Devices = () => {
    return <>
        {mock.map(tag => (
            <div key={tag.Id} className={styles.tagContainer}>
                <div className={styles.tagHeader}>
                    <div className={styles.tagName}>
                        <Icon name='tag'/>
                        <div>{tag.Name}</div>
                    </div>
                    <Icon name='arrowDown'/>
                </div>
                <div className={commonStyles.elementsContainer}>
                    {tag.Events.map(element => (
                        <div className={commonStyles.element} key={element.Id}>
                            <div className={commonStyles.text}>
                                <div>{element.Name}</div>
                                <div className={commonStyles.textId}>Id: {element.Id}</div>
                            </div>
                            <div className={commonStyles.switch}><Switch size='small' checked={false}/></div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </>
};

export default Devices;
