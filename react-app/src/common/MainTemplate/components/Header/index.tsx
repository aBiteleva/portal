import React from 'react';
import styles from './styles.module.scss';
import Icon from '../../../components/Icon';
import {useNavigate} from 'react-router-dom';
import variables from '../../../../../variables.module.scss';
import {useAction} from '../../../../hooks/useAction';

const Header = () => {
    const navigate = useNavigate();
    const {setCurrentActiveRule} = useAction();

    return <div className={styles.header}>
        <div className={styles.headerTitle} onClick={() => {
            navigate('/');
            setCurrentActiveRule(null);
        }}>
            <Icon name="logo" className={styles.headerTitleImg} color={variables.whiteColor}/>
            <div className={styles.headerTitleText}>ARS</div>
        </div>
        <div className={styles.headerMenu}>
            <a>Главная</a>
            <a>Документация</a>
            <a>О проекте</a>
            <a>Тарифы</a>
            <a>Еще</a>
            <Icon name="arrowDown" color={variables.whiteColor}/>
        </div>

    </div>;
};

export default Header;
