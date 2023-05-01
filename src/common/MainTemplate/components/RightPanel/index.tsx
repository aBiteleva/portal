import React, {FC, ReactNode} from 'react';
import styles from './styles.module.scss'

interface RightPanelInterface {
    blocks: ReactNode,
}

const RightPanel: FC<RightPanelInterface> = ({blocks}) => {
    return <div className={styles.rightPanel}>
        <div>{blocks}</div>
    </div>;
};

export default RightPanel;
