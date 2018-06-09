import axios from 'axios';
import moment from 'moment';
import csvWriter from 'csv-write-stream';
import fs from 'fs';
import { read } from '../hardware/thermostat';
import config from '../config';

export function logData(name, status, attribute, value, comment) {
  const now = moment.utc().format();
  logFile(now, name, status, attribute, value, comment);
}

export function logFile(timestamp, name, status, attribute, value, comment) {
  const logs = [timestamp, name, status, attribute, value, comment];
  const logStream = fs.createWriteStream(config.CSV_FILENAME, {'flags': 'a'});
  logStream.write(`${logs.join()}\n`);
  logStream.end();
}

export function logDB(timestamp, name, status, attribute, value, comment) {
  console.log(timestamp, name, status, attribute, value, comment);
}

export function logSensors() {
  let humidity;
  let now;
  let temperature_C;
  read().then((data) => {
    const { humidity, temperature_C } = data;
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
