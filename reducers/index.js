import HardwareTypes from '../constants/HardwareTypes';

const initialState = {
  currentTemp: null,
  isFanOn: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HardwareTypes.SET_CURRENT_TEMP:
      return { ...state,
        ...action.payload,
      };
    case HardwareTypes.DID_CHANGE_FAN:
      return { ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
