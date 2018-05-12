import moment from 'moment';
import { read } from '../hardware/thermostat';

export function logData(name, status, attribute, value, comment) {
  const now = moment.utc().format();
  console.log(now);
}

export function logFile(timestamp, name, status, attribute, value, comment) {
  console.log(timestamp, name, status, attribute, value, comment);
}

export function logDB(timestamp, name, status, attribute, value, comment) {
  console.log(timestamp, name, status, attribute, value, comment);
}

export function logSensors() {
  read().then((data) => {
    const { humidity, temperature_C } = data;
    logData('si7921_top', 'Success', 'temperature', temperature_C, '')
    logData('si7021_top', 'Success', 'humidity', humidity, '')
  })
  .catch((err) => {
    logData('si7921_top', 'Failure', 'temperature/humidity', '', err)
  });
}
