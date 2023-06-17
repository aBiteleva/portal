import React, {FC} from 'react';
import commonStyles from '../../../../common/styles/styles.module.scss';
import {Switch} from 'antd';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {useAction} from '../../../../hooks/useAction';
import variables from '../../../../../variables.module.scss';

interface SystemElementsInterface {
    onDoubleClick: (elementChildren: any[]) => void;
}

const SystemElements: FC<SystemElementsInterface> = ({onDoubleClick}) => {
    const {currentSystem, currentSystems} = useTypedSelector(state => state.systemsValues);
    const {setCurrentSystem, setCurrentActiveRule} = useAction();

    return <div className={commonStyles.elementsContainer}>
        {currentSystems?.map(element => (
            <div
                className={commonStyles.element}
                style={currentSystem.code === element.code
                    ? {
                        background: variables.yellowColor,
                        color: variables.darkBlueColor
                    }
                    : undefined}
                key={element.code}
                onClick={() => {
                    {/*@ts-ignore*/}
                    setCurrentSystem({...element, currentSystems});
                    setCurrentActiveRule(null);
                }}
                // @ts-ignore
                onDoubleClick={() => onDoubleClick(element.children)}
            >
                <div className={commonStyles.text}>
                    {/*@ts-ignore*/}
                    <div>{element.name}</div>
                    <div className={commonStyles.textId}
                         style={currentSystem.code === element.code
                             ? {
                                 color: variables.greyColor
                             }
                             : undefined}
                    >
                        Id: {element.code}
                    </div>
                </div>
                {/*@ts-ignore*/}
                <div className={commonStyles.switch}><Switch size="small" checked={element?.IsCheck}/></div>
            </div>
        ))}
    </div>;
};

export default SystemElements;
