import { Gpio } from 'onoff';
import Si7021 from 'si7021-sensor';
import { setCurrentTemp, setIsFanOn } from '../actions';
import { FAN_PIN, TARGET_TEMP, OUT, HIGH, LOW } from '../constants';
import { getStore, getCurrentTemp, isFanOn } from '../store';
const si7021 = new Si7021();

export function read() {
  return si7021.readSensorData();
}

export const adjustThermostat = () => {
  let temperature_C = 23;
  return si7021.readSensorData()
    .then((data) => {
      const { humidity, temperature_C } = data;
      console.log(`data = ${JSON.stringify(data, null, 2)}`);

      getStore().dispatch(setCurrentTemp(23));
      getStore().dispatch(setIsFanOn(true));
      console.log(getCurrentTemp(getStore()));
      console.log(isFanOn(getStore()));

      let currentFanOn = true;
      let priorFanOn = isFanOn(getStore());

      console.log(`Target Temp ${TARGET_TEMP}`);
      console.log(`Current Temp ${temperature_C}`);

      if (temperature_C > TARGET_TEMP) {
        const fan = new Gpio(FAN_PIN, OUT);
        light.writeSync(HIGH);
        console.log('Fan On');
      } else {
        const fan = new Gpio(FAN_PIN, OUT);
        light.writeSync(LOW);
        currentFanOn = false;
        console.log('Fan Off');
      }

      console.log(`CurrentFanOn: ${currentFanOn}`);
      console.log(`PriorFanOn: ${priorFanOn}`);

      if (currentFanOn !== priorFanOn) {
        console.log('Fans not equal');
        if (currentFanOn) {
          logData('Exhaust Fan', 'Success', 'state', 'On', `Current Temp: ${temperature_C}`);
        } else {
          logData('Exhaust Fan', 'Success', 'state', 'Off', `Current Temp: ${temperature_C}`);
        }
      }

      getStore().dispatch(setCurrentTemp(temperature_C));
      getStore().dispatch(setIsFanOn(currentFanOn));

    })
    .catch((err) => {
      console.log(`Si7021 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
}
