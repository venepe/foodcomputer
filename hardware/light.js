import { Gpio } from 'onoff';
import { LIGHT_PIN, OUT, HIGH, LOW } from '../constants';
import { logData } from '../logger';

export function setLightOff() {
  const light = new Gpio(LIGHT_PIN, OUT);
  console.log('Turn lights Off');
  light.writeSync(LOW);
  logData('Light_Switch', 'Success', 'light', 'Off', '')
}

export function setLightOn() {
  const light = new Gpio(LIGHT_PIN, OUT);
  console.log('Turn lights On');
  light.writeSync(HIGH);
  logData('Light_Switch', 'Success', 'light', 'On', '')
}
