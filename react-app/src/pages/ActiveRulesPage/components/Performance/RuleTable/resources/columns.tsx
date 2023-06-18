import React from 'react';
import {Switch, Tag} from 'antd';

export const columns = [
    {
        title: 'Название',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Id',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: () => <Switch/>
    },
    {
        title: 'Тэги',
        dataIndex: 'tag',
        key: 'tag',
        render: () => <><Tag color="green">Увлажнение</Tag><Tag color="orange">Кабинет начальника</Tag></>
    },
];
