import React, {useEffect, useMemo} from 'react';
import styles from './styles.module.scss';
import stylesCommon from '../../../../../styles/styles.module.scss';
import Icon from '../../../../../components/Icon';
import {useAppDispatch, useTypedSelector} from '../../../../../../hooks/useTypedSelector';
import {useAction} from '../../../../../../hooks/useAction';
import {SystemsInterface} from '../../../../../../store/types/systemsTypes';
import variables from '../../../../../../../variables.module.scss';

const LeftPanel = () => {
    const {systems, systemPagesWay, currentSystems} = useTypedSelector(state => state.systemsValues);
    const dispatch = useAppDispatch();
    const {setSystemPagesWay, setCurrentSystems, setCurrentSystem} = useAction();

    const parentSystems = systems?.filter(system => system.code === '00001');

    const onChoseParentSystem = (system: SystemsInterface) => {
        if (system.children && system.children.length > 0) {
            dispatch(() => setSystemPagesWay([{
                name: `${system.name}`,
                code: system.code,
                systems: system.children
            }]));
            setCurrentSystems(system.children);
        }
    };

    useEffect(() => {
        if(location.pathname !== '/active-rules' && parentSystems?.length > 0 && currentSystems.length < 1) {
            setCurrentSystem(parentSystems[0]);
            onChoseParentSystem(parentSystems[0]);
        }
    }, []);

    return <div className={styles.systems}>
        <div className={styles.header}>
            <div>Системы</div>
            <Icon name="plus"/>
        </div>
        <div className={styles.systemsBlocks}>
            {parentSystems.map(system => (
                <div key={system.code}
                     style={systemPagesWay?.[0]?.code === system.code
                         ? {background: variables.yellowColor}
                         : undefined}
                     onClick={() => {
                         setCurrentSystem(system);
                         onChoseParentSystem(system);
                     }}>
                    <Icon name="zavod"
                          color={systemPagesWay?.[0]?.code === system.code && variables.darkBlueColor}
                    />
                    <div style={systemPagesWay?.[0]?.code === system.code
                        ? {color: variables.darkBlueColor}
                        : undefined}>
                        {system.name}
                    </div>
                </div>
            ))}
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
