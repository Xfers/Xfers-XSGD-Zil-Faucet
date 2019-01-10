import { select, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getAddressFromPrivateKey, getPubKeyFromPrivateKey } from '@zilliqa-js/crypto';

import * as consts from './actions';

const getZilliqa = (state) => state.zil.zilliqa;

export function* accessWalletSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const privateKey: string = payload.privateKey;
    const address = getAddressFromPrivateKey(privateKey);
    const publicKey = getPubKeyFromPrivateKey(privateKey);

    const zilliqa = yield select(getZilliqa);
    zilliqa.wallet.addByPrivateKey(privateKey);

    yield put({
      type: consts.ACCESS_WALLET_SUCCEEDED,
      payload: {
        address,
        publicKey
      }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.ACCESS_WALLET_FAILED });
  }
}
export function* watchAccessWalletSaga() {
  yield takeLatest(consts.ACCESS_WALLET, accessWalletSaga);
}
