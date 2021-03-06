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

import { decryptPrivateKey } from '@zilliqa-js/crypto';

const decrypt = async (event) => {
  try {
    const { passphrase, keystoreV3 } = event.data;
    const privateKey = await decryptPrivateKey(passphrase, keystoreV3);
    // @ts-ignore
    self.postMessage({ privateKey });
  } catch (error) {
    console.log(error);
    // @ts-ignore
    self.postMessage({ privateKey: undefined });
  }
};

// Worker.ts
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener('message', (event) => decrypt(event).catch(console.log));
