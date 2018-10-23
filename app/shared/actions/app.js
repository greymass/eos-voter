import * as types from './types';
import eos from './helpers/eos';

export function downloadProgress(progress) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.APP_UPDATE_DOWNLOAD_PROGRESS,
      payload: progress
    });
  };
}

export function getConstants() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETCONSTANTS_PENDING
    });
    const { connection } = getState();
    // Don't retrieve if we're not on mainnet
    if (connection.chain !== 'eos-mainnet') {
      return dispatch({
        type: types.SYSTEM_GETCONSTANTS_FAILURE
      });
    }

    const query = {
      json: true,
      code: 'anchorwallet',
      scope: 'anchorwallet',
      table: 'constants',
      limit: 1000,
    };
    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const data = rows.reduce((map, { key, value }) =>
        ({ ...map, [key]: value }), {});
      return dispatch({
        type: types.SYSTEM_GETCONSTANTS_SUCCESS,
        payload: { data }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETCONSTANTS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  downloadProgress
};
