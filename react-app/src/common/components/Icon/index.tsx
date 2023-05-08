import React, {FC} from 'react';
import resource from "../Icon/resources/icons";
import * as calendar from '../../../../../root-config/public/images/Calendar.svg'

interface IconInterface {
    style?: object,
    className?: string,
    color?: string,
    name: string,
    onClick?: () => void
}

export const getResource = (name: any) => {
    //@ts-ignore
    return resource[name];
};

const Icon: FC<IconInterface> = ({
                                     className,
                                     style = {},
                                     color,
                                     name,
                                     onClick
                                 }) => {

    const element = getResource(name);

    console.log(element)

    return <>
        {element && <div
        // src="images/Copy.svg"
        onClick={onClick}
        style={{
            ...style,
            color: '#fff',
            cursor: onClick && 'pointer'
        }}
        className={className}
        dangerouslySetInnerHTML={{__html: element}}
    />}
    </>;
};

export default Icon;
