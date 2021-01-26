import React from 'react';

import { Button } from 'reactstrap';
import I18n from 'i18next';
import { onViewOnChain } from 'src/utils/utility';

interface ViewOnChainProps {
  txid: string;
}

const ViewOnChain: React.FunctionComponent<ViewOnChainProps> = (
  props: ViewOnChainProps
) => {
  const { txid } = props;

  return (
    <Button onClick={() => onViewOnChain(txid)} color='link' className='mr-3'>
      {I18n.t('containers.swap.addLiquidity.viewOnChain')}
    </Button>
  );
};

export default ViewOnChain;
