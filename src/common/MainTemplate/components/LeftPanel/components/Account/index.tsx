import React, {FC} from 'react';
import styles from './styles.module.scss'
import Icon from "../../../../../components/Icon";
import stylesCommon from '../../../../../../common/styles/styles.module.scss'
import {useAppDispatch} from "../../../../../../hooks/useTypedSelector";
import {useAction} from "../../../../../../hooks/useAction";

const Account: FC = () => {
    const {logout} = useAction();
    const dispatch = useAppDispatch();

    return <div>
        <hr className={stylesCommon.line} />
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
                <Icon name='exit' onClick={() => dispatch(() => logout())}/>
            </div>

        </div>
    </div>
};

export default Account;
