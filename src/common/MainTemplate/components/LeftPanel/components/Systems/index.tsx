import React from 'react';
import styles from './styles.module.scss';
import stylesCommon from '../../../../../styles/styles.module.scss';
import Icon from '../../../../../components/Icon';
import resource from '../../../../../../../public/icons/icons';


const LeftPanel = () => {

    return <div className={styles.systems}>
        <div className={styles.header}>
            <div>Системы</div>
            <Icon name="plus"/>
        </div>
        <div className={styles.systemsBlocks}>
            <div>
                <Icon name="zavod"/>
                <div>Завод - Краснореченская 107</div>
            </div>
            <div>
                <Icon name="home"/>
                <div>Умный дом - Ворошилова 50</div>
            </div>
            <div>
                <Icon name="study"/>
                <div>ВУЗ - Суворова 27</div>
            </div>
        </div>

        <hr className={stylesCommon.line}/>

        <div className={styles.header}>
            <div>Информация о системах</div>
        </div>
        <div className={styles.systemsBlocks}>
            <div id="Logs">
                <Icon name="logs"/>
                <div>Логи сервисов</div>
            </div>
        </div>
    </div>;
};

export default LeftPanel;
