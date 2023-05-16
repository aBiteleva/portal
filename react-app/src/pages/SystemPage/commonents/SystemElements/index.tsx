import React, {FC} from 'react';
// @ts-ignore
import commonStyles from '../../../../common/styles/styles.module.scss';
import {Switch} from 'antd';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {useAction} from '../../../../hooks/useAction';
// @ts-ignore
import variables from '../../../../../variables.module.scss';

interface SystemElementsInterface {
    systems: any[],
    onDoubleClick: (elementChildren: any[]) => void;
}

const SystemElements: FC<SystemElementsInterface> = ({systems, onDoubleClick}) => {

    const {currentSystem} = useTypedSelector(state => state.systemsValues);
    const {setCurrentSystem, setCurrentActiveRule} = useAction();

    return <div className={commonStyles.elementsContainer}>
        {systems?.map(element => (
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
                    setCurrentSystem({...element, systems});
                    setCurrentActiveRule(null);
                }}
                onDoubleClick={() => onDoubleClick(element.children)}
            >
                <div className={commonStyles.text}>
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
                <div className={commonStyles.switch}><Switch size="small" checked={element?.IsCheck}/></div>
            </div>
        ))}
    </div>;
};

export default SystemElements;
