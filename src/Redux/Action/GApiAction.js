import { GApiConstants } from '../../constants/GApiConstants';

export function policyPatched() {
  return dispatch => {
    dispatch(updatePolicyList())
  }
}

function updatePolicyList() { return { type: GApiConstants.updatePolicyList } }

export const listComponentUpdated = () => {
  return dispatch => {
    dispatch(listUpdated());
  }
}

function listUpdated() { return { type: GApiConstants.emmComponentUpdated } }

