import Icon from '../../../../../common/components/Icon';
import React from 'react';
import stylesCommon from '../../../../../common/styles/styles.module.scss';
import { Link } from 'react-router-dom';
import variables from '../../../../../../variables.module.scss';

const Elements = () => {
  return (
    <>
      <div className={stylesCommon.rightPanelBlockTitle}>Элементы системы</div>
      <div className={stylesCommon.rightPanelBlockAction}>
        <Icon name="events" />
        <div className={stylesCommon.rightPanelBlockActionText}>
          {/*eslint-disable-next-line*/}

          <Link
            style={{ textDecoration: 'none', color: variables.yellowColor }}
            to="/events"
          >
            Список событий
          </Link>
        </div>
      </div>
      <div className={stylesCommon.rightPanelBlockAction}>
        <Icon name="study" />
        <div className={stylesCommon.rightPanelBlockActionText}>
          <Link
            style={{ textDecoration: 'none', color: variables.yellowColor }}
            to="/devices"
          >
            Список правил
          </Link>
        </div>
      </div>
    </>
  );
};

export default Elements;
