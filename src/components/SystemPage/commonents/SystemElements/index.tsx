import React, {useEffect} from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {Switch} from 'antd';
import {useAppDispatch, useTypedSelector} from '../../../../hooks/useTypedSelector';
import {useAction} from '../../../../hooks/useAction';
import variables from '../../../../../variables.module.scss';

const SystemElements = () => {
    const {loading, error, systems, currentSystem} = useTypedSelector(state => state.systemsValues);
    const {fetchSystems, setCurrentSystem} = useAction();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(() => fetchSystems());
    }, []);

    if (loading) {
        return <div>Идёт загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div className={commonStyles.elementsContainer}>
        {systems.map(element => (
            <div
                className={commonStyles.element}
                style={currentSystem === element.Id
                    ? {
                        background: variables.yellowColor,
                        color: variables.darkBlueColor
                    }
                    : undefined}
                key={element.Id}
                onClick={() => setCurrentSystem(element.Id)}>
                <div className={commonStyles.text}>
                    <div>{element.Name}</div>
                    <div className={commonStyles.textId} style={currentSystem === element.Id
                        ? {
                            color: variables.greyColor
                        }
                        : undefined}>Id: {element.Id}</div>
                </div>
                <div className={commonStyles.switch}><Switch size="small" checked={element.IsCheck}/></div>
            </div>
        ))}
    </div>;
};

export default SystemElements;
