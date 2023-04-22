import React from 'react';
import styles from './styles.module.scss';
import Icon from "../../../../common/components/Icon";

const AddButton = () => {
    return <div className={styles.addButton}>
        <button>Добавить<Icon name='plus' /></button>
    </div>
};

export default AddButton;
