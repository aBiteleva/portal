import React, {FC} from 'react';
import styles from './styles.module.scss';
import Icon from '../../../../common/components/Icon';

interface AddButtonInterface {
    onClick?: () => void;
}

const AddButton: FC<AddButtonInterface> = ({onClick}) => {
    return <div className={styles.addButton}>
        <button onClick={onClick}>Добавить<Icon name="plus"/></button>
    </div>;
};

export default AddButton;
