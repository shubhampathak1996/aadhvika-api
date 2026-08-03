import dotenv from 'dotenv';
import fs from 'fs';

const localEnvFile = '.env.local';
const nodeEnvFile = `.env.${process.env.NODE_ENV || 'development'}`;

if (fs.existsSync(localEnvFile)) {
  dotenv.config({ path: localEnvFile });
} else {
  dotenv.config({ path: nodeEnvFile });
}

export default dotenv;
