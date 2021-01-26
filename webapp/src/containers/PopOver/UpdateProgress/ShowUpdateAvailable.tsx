import React from 'react';
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { showAvailableUpdateResponse } from '../../../app/update.ipcRenderer';
import { closeUpdateAvailable } from '../reducer';
import I18n from 'i18next';

interface ShowUpdateAvailableComponentProps {
  closeUpdateAvailable: () => void;
  closeModal: (fn: any) => void;
}

const ShowUpdateAvailableComponent = (
  props: ShowUpdateAvailableComponentProps
) => {
  const { closeUpdateAvailable, closeModal } = props;
  const closing = () => closeModal(closeUpdateAvailable);
  return (
    <>
      <ModalBody>
        <h1 className='h4'>{I18n.t('alerts.showUpdateAvailableHeader')}</h1>
        {I18n.t('alerts.showUpdateAvailableNotice')}
      </ModalBody>
      <ModalFooter>
        <Button size='sm' color='primary' onClick={showAvailableUpdateResponse}>
          {I18n.t('alerts.yesShowUpdateAvailableButton')}
        </Button>
        <Button size='sm' color='link' onClick={closing}>
          {I18n.t('alerts.noShowUpdateAvailableButton')}
        </Button>
      </ModalFooter>
    </>
  );
};

const mapDispatchToProps = {
  closeUpdateAvailable,
};

export default connect(null, mapDispatchToProps)(ShowUpdateAvailableComponent);
