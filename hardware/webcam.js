import moment from 'moment';
import NodeWebcam from 'node-webcam';
import path from 'path';
import request from 'request';
import fs from 'fs';
import config from '../config';
const imagesDir = path.join(__dirname, '../', 'images');

function uploadSnapshot(filename, createdAt) {
  const url = `${config.BASE_URL}/snapshots`;
  const formData = {
    createdAt,
    image: fs.createReadStream(filename),
  };

  return request.post({url, formData});
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

  webcam.capture(filename, (err, data) => {
    if (err) {
      console.log(`Webcam error: ${err}`);
    } else {
      console.log(`Webcam captured: ${data}`);
      uploadSnapshot(filename, now)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
