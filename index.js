import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import { initStore } from './store'
// import { startLightSchedule, startThermostatSchedule,
//   startWebCamSchedule, startLoggingSensorsSchedule } from './scheduler';
import { capturePicture } from './hardware/webcam';
import { logSensors } from './logger';
const port = 8080;

initStore();

capturePicture();

function loopSensor() {
  logSensors();
  setTimeout(() => {
    loopSensor();
  }, 2000);
}

loopSensor();

// startLightSchedule();
// startThermostatSchedule();
// startWebCamSchedule();
// startLoggingSensorsSchedule();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  res.status(404).json({});
});

const httpServer = http.createServer(app);
httpServer.listen(port);
