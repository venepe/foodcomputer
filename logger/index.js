import axios from 'axios';
import moment from 'moment';
import { read } from '../hardware/thermostat';
import config from '../config';

export function logData(name, status, attribute, value, comment) {
  const now = moment.utc().format();
}

export function logFile(timestamp, name, status, attribute, value, comment) {
  console.log(timestamp, name, status, attribute, value, comment);
}

export function logDB(timestamp, name, status, attribute, value, comment) {
  console.log(timestamp, name, status, attribute, value, comment);
}

export function logSensors() {
  let humidity;
  let now;
  let temperature_C;
  read().then((data) => {
    { humidity, temperature_C } = data;
    now = moment.utc().format();

    logData('si7921_top', 'Success', 'temperature', temperature_C, '');
    logData('si7021_top', 'Success', 'humidity', humidity, '');

    return axios.post(`${config.BASE_URL}/temperatures`, {
      value: temperature_C,
      createdAt: now,
    });
  })
  .then(() => {
    return axios.post(`${config.BASE_URL}/humidities`, {
      value: humidity,
      createdAt: now,
    });
  })
  .catch((err) => {
    logData('si7921_top', 'Failure', 'temperature/humidity', '', err);
  });
}
