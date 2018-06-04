import moment from 'moment';
import NodeWebcam from 'node-webcam';
import path from 'path';
import rp from 'request-promise';
import fs from 'fs';
import del from 'del';
import config from '../config';
const imagesDir = path.join(__dirname, '../', 'images');
const maxErrorCount = 5;
let errorCount = 0;

function resetErrorCount() {
  errorCount = 0;
}

function incrementErrorCount() {
  errorCount += 1;
}

function uploadSnapshot(filename, createdAt) {
  const uri = `${config.BASE_URL}/snapshots`;
  const formData = {
    createdAt,
    image: fs.createReadStream(filename),
  };

  const options = {
    method: 'POST',
    uri,
    formData,
  };

  return rp(options);
}

export function capturePicture() {
  const webcam = NodeWebcam.create({
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: 'jpeg',
    device: false,
    callbackReturn: 'location',
    verbose: false,
  });
  const now = moment.utc().format();
  const filename = `${imagesDir}/${now}`;

  webcam.capture(filename, (err, result) => {
    if (err) {
      console.log(`Webcam error: ${err}`);
      if (errorCount < maxErrorCount) {
        incrementErrorCount();
        capturePicture();
      } else {
        resetErrorCount();
      }
    } else {
      console.log(`Webcam captured: ${result}`);
      resetErrorCount();
      uploadSnapshot(result, now)
        .then((result) => {
          console.log(result);
          del([filename]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
