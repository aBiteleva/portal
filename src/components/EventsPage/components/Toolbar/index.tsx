import React from 'react';
import commonStyles from "../../../../common/styles/styles.module.scss";
import Icon from "../../../../common/components/Icon";

const Toolbar = () => {
    return (
        <div className={commonStyles.toolbar}>
            <div>
                <Icon name='preference'/>
                <div>Фильтр</div>
                <Icon name='arrowDown'/>
            </div>
            <div>
                <Icon name='exportIcon'/>
                <div>Экспорт</div>
            </div>
        </div>
    )
};

export default Toolbar;
