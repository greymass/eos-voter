import * as types from './types';
import eos from './helpers/eos';
import { setSetting } from './settings';
import { findIndex } from 'lodash';

export function getBidForName(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_NAMEBID_PENDING
    });
    const { connection, settings } = getState();
    // Don't retrieve if we're not on mainnet
    if (connection.chain !== 'eos-mainnet') {
      return dispatch({
        type: types.SYSTEM_NAMEBID_FAILURE
      });
    }

    const query = {
      code: 'eosio',
      json: true,
      limit: 1,
      lower_bound: name,
      scope: 'eosio',
      table: 'namebids'
    };

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const namebid = rows[0];

      const recentBids = (settings.recentBids && settings.recentBids) || {};

      const bidIndex = findIndex(recentBids[settings.account] || [], { newname: namebid.newname });

      if (bidIndex > -1) {
        recentBids[settings.account][bidIndex] =
          { newname: namebid.newname, bid: recentBids[settings.account][bidIndex].bid, highestBid: namebid.highest_bid };

        dispatch(setSetting('recentBids', recentBids));
      }

      return dispatch({
        type: types.SYSTEM_NAMEBID_SUCCESS,
        payload: {
          namebid
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_NAMEBID_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getBidForName
};
