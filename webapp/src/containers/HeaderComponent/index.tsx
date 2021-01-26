import React from 'react';
import { connect } from 'react-redux';

import { RouteComponentProps } from 'react-router-dom';
import I18n from 'i18next';
import Badge from '../../components/Badge';
import { startUpdateApp, openBackupWallet } from '../PopOver/reducer';

interface HeaderProps {
  children: React.ReactNode;
  updateAvailableBadge: boolean;
  startUpdateApp: () => void;
  openBackupWallet: () => void;
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const {
    updateAvailableBadge,
    startUpdateApp,
    openBackupWallet,
    children,
  } = props;
  const openUpdatePopUp = () => {
    openBackupWallet();
    startUpdateApp();
  };
  return (
    <header className='header-bar'>
      {updateAvailableBadge && (
        <Badge
          baseClass='update-available'
          outline
          onClick={openUpdatePopUp}
          label={I18n.t('containers.wallet.walletPage.updateAvailableLabel')}
        />
      )}
      {children}
    </header>
  );
};

const mapStateToProps = (state) => {
  const {
    popover: { updateAvailableBadge },
  } = state;
  return {
    updateAvailableBadge,
  };
};

const mapDispatchToProps = {
  startUpdateApp,
  openBackupWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
