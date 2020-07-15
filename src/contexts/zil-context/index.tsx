/**
 * This file is part of nucleus-wallet.
 * Copyright (c) 2018 - present Zilliqa Research Pte. Ltd.
 *
 * nucleus-wallet is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * nucleus-wallet is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * nucleus-wallet.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { fromBech32Address } from '@zilliqa-js/crypto';

const getHost = (host: string) => {
  switch (host) {
    default:
      return 'https://faucet.internal.xfers.com';
  }
};
const initialState: any = {
};

export const ZilContext = React.createContext(initialState);

export class ZilProvider extends React.Component {
  public readonly state = initialState;
  public faucet = async ({ args, signal }): Promise<string | void> => {
    const { token, toAddress } = args;
    const address = fromBech32Address(toAddress);
    const body = JSON.stringify({ ToAddress: address, Amount: 5 });
    const res = await fetch(`${getHost(window.location.hostname)}/faucet/send`, {
      signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
    if (!res.ok) throw new Error('Failed to run faucet, you may have reached maximum request limit.');
    const data = await res.json();
    return data ? data.Data.ID : undefined;
  };

  public render() {
    return (
      <ZilContext.Provider
        value={{
          faucet: this.faucet
        }}
      >
        {this.props.children}
      </ZilContext.Provider>
    );
  }
}
