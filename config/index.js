import path from 'path';

export default {
  mongoUrl: 'mongodb://mongo/babelpack',
  port: process.env.PORT || 8080,
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  CSV_FILENAME: `${path.join(__dirname, '../', '/data')}/logs.csv`,
}
