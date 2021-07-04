const initialState = {
  regular: {value: null, loading: false},
  extreme: {value: null, loading: false},
  banned: {value: null, loading: false},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'setRewards':
    return { ...state, ...payload }
  case 'setReward':
    return { ...state, ...payload }
  case 'setRewardTicketsCost':
    return { ...state, ...payload }

  default:
    return state
  }
}
