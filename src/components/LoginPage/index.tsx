import React, {useState} from 'react';
import {useAppDispatch} from '../../hooks/useTypedSelector';
import {useAction} from '../../hooks/useAction';
import styles from './styles.module.scss';
import {Button, Input} from 'antd';

const LoginPage = () => {
    const {login, registration} = useAction();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.auth}>
            <div className={styles.authComponent}>
                <div className={styles.authContainer}>
                    <div className={styles.authTitle}>Авторизуйтесь</div>
                    <Input className={styles.input}
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="email"
                           placeholder="Email"
                    />
                    <Input className={styles.input}
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           type="password"
                           placeholder="Пароль"
                    />
                    <Button className={styles.button} type="primary"
                            onClick={() => dispatch(() => login(email, password))}>Вход</Button>
                    <Button type="link"
                            onClick={() => dispatch(() => registration(email, password))}>Регистрация</Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
