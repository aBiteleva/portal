import React from 'react';
import styles from './styles.module.scss'
import Icon from "../../../../../common/components/Icon";

const Account = () => {
    return <div>
        <hr className={styles.line} />
        <div className={styles.accountBlock}>
            <div className={styles.userInfo}>
                <img src={'images/avatar.jpeg'} className={styles.avatar}>
                </img>
                <div className={styles.text}>
                    <div>Иванов И.И.</div>
                    <div className={styles.grade}>Разработчик</div>
                </div>

            </div>
            <div className={styles.actions}>
                <Icon name='preference'/>
                <Icon name='exit'/>
            </div>

        </div>
    </div>
};

export default Account;
