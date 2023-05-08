import React, {FC} from 'react';
import resource from "../../../../public/icons/icons";

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

    return <>{element && <div
        onClick={onClick}
        style={{
            ...style,
            color,
            cursor: onClick && 'pointer'
        }}
        className={className}
        dangerouslySetInnerHTML={{__html: element}}
    />}</>;
};

export default Icon;
