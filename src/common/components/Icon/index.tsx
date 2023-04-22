import React, {FC} from 'react';
import resource from "../../../../public/icons/icons";

interface IconInterface {
    style?: object,
    className?: string,
    color?: string,
    name: string
}

export const getResource = (name:  any) => {
    //@ts-ignore
    return resource[name];
};

const Icon: FC<IconInterface> = ({
                                     className,
                                     style = {},
                                     color,
                                     name
                                 }) => {

    const element = getResource(name);

    return <>{element && <div
        style={{
            ...style,
            color
        }}
        className={className}
        dangerouslySetInnerHTML={{__html: element}}
    />}</>;
};

export default Icon;
