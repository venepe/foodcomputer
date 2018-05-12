import moment from 'moment';
import NodeWebcam from 'node-webcam';
import path from 'path';
const imagesDir = path.join(__dirname, '../', 'images');;

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
    verbose: false
  });
  const now = moment.utc().format();
  const filename = `${imagesDir}/${now}`;

  webcam.capture(filename, (err, data) => {
    if (err) {
      console.log(`Webcam error: ${err}`);
    } else {
      console.log(`Webcam captured: ${data}`);
    }
  });
}
