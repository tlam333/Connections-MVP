/** 
 * Keep dotenv require in this folder and any db configuration
*/
require('dotenv').config();
const db = require('./db');

const config = {
  access_token_secret: process.env.ACCESS_TOKEN_SECRET!,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET!,
  db: db
};

export default config;