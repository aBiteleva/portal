import React, {FC} from 'react';
import variables from '../../../../variables.module.scss';

interface IconInterface {
    width?: number | string,
    height?: number | string,
    className?: string,
    color?: string,
    name: string,
    onClick?: () => void
}

const Icon: FC<IconInterface> = ({
                                     className,
                                     width,
                                     height,
                                     color,
                                     name,
                                     onClick
                                 }) => {


    return <svg
        width={width || 20}
        height={height || 20}
        cursor={onClick && 'pointer'}
        className={className}
        fill={color || variables.yellowColor}
        onClick={onClick}
        viewBox="0 0 100 100"
    >
        <use xlinkHref={`/icons.svg#${name}`}></use>
    </svg>;
};

export default Icon;
