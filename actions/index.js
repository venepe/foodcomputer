import HardwareTypes from '../constants/HardwareTypes';

export const setCurrentTemp = currentTemp => ({
  type: HardwareTypes.SET_CURRENT_TEMP,
  payload: {
    currentTemp,
  },
});

export const setIsFanOn = isFanOn => ({
  type: HardwareTypes.DID_CHANGE_FAN,
  payload: {
    isFanOn,
  },
});

const actions = {
  setCurrentTemp,
  setIsFanOn,
};

export default actions;
