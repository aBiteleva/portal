import React from 'react';
import styles from './styles.module.scss'
import Icon from "../../../../../common/components/Icon";

const Managing = () => {
    return <div className={styles.managing}>
        <div>Управление</div>
        <div className={styles.managingAction}>
            <Icon  name='plus'/>
            <div className={styles.managingActionText}>Добавить</div>
        </div>
        <div className={styles.managingAction}>
            <Icon  name='info' />
            <div className={styles.managingActionText}>Информация</div>
        </div>
        <div className={styles.managingAction}>
            <Icon  name='korzina' />
            <div className={styles.managingActionText}>Удалить</div>
        </div>
    </div>
};

export default Managing;
