import { CronJob } from 'cron';
import moment from 'moment';
import { setLightOn, setLightOff } from '../hardware/light';
import { adjustThermostat } from '../hardware/thermostat';
import { capturePicture } from '../hardware/webcam';
import { logSensors } from '../logger';
const timezone = 'America/Chicago';
const startTimeUTC = 1100;
const endTimeUTC = 330;

export function startLightSchedule() {

  const now = parseInt(moment.utc().format('Hmm'));
  if (now > startTimeUTC || now < endTimeUTC) {
    setLightOn();
  } else {
    setLightOff();
  }

  // Turn lights on at 6AM
  new CronJob('0 6 * * *', () => {
    setLightOn();
  }, () => {
    console.log('Light On schedule cron job stopped');
  },
  true,
  timezone,
  );

  // Turn lights off at 22:30 (10:30PM)
  new CronJob('30 22 * * *', () => {
    setLightOff();
  }, () => {
    console.log('Light Off schedule cron job stopped');
  },
  true,
  timezone,
  );
}

export function startThermostatSchedule() {

  // Check thermostat every minute
  new CronJob('*/1 * * * *', () => {
    adjustThermostat();
  }, () => {
    console.log('Thermostat schedule cron job stopped');
  },
  true,
  timezone,
  );
}

export function startWebCamSchedule() {

  // Take a USB camera picture one minute after the hour from 6am to 10pm
  new CronJob('1 6-22 * * *', () => {
    capturePicture();
  }, () => {
    console.log('WebCam schedule cron job stopped');
  },
  true,
  timezone,
  );
}

export function startLoggingSensorsSchedule() {

  // Log the sensors every 20 minutes
  new CronJob('*/20 * * * *', () => {
    capturePicture();
  }, () => {
    console.log('Logging Sensors schedule cron job stopped');
  },
  true,
  timezone,
  );
}
