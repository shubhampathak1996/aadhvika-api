/**
 * Test Script for Uploads List Endpoint
 *
 * Tests the new GET /uploads/list endpoint
 *
 * Usage: node test-uploads-list.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3001/uploads';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.blue}${msg}${colors.reset}\n`),
};

async function testListUploads() {
  log.section('TEST: List All Uploaded Images (GET /uploads/list)');

  try {
    const response = await axios.get(`${BASE_URL}/list`);

    if (response.status === 200 && response.data.success) {
      log.success('Successfully fetched upload list');
      log.info(`Total images found: ${response.data.total}`);

      if (response.data.data.length > 0) {
        console.log('\n' + colors.yellow + 'Uploaded Images:' + colors.reset);
        response.data.data.forEach((image, index) => {
          console.log(`  ${index + 1}. ${image.filename}`);
          console.log(`     URL: ${image.url}`);
        });
      } else {
        log.info('No images found in uploads folder');
        log.info('Upload some images first using POST /uploads');
      }

      // Display response structure
      console.log('\n' + colors.yellow + 'Full Response:' + colors.reset);
      console.log(JSON.stringify(response.data, null, 2));

      return true;
    } else {
      log.error('Unexpected response format');
      console.log(response.data);
      return false;
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
    if (error.response) {
      console.log('Response:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      log.error('Server is not running! Start it with: npm run dev');
    }
    return false;
  }
}

async function runTest() {
  console.log(
    `${colors.yellow}═══════════════════════════════════════════${colors.reset}`,
  );
  console.log(`${colors.yellow}  UPLOADS LIST ENDPOINT TEST${colors.reset}`);
  console.log(
    `${colors.yellow}═══════════════════════════════════════════${colors.reset}`,
  );

  log.info(`Testing endpoint: ${BASE_URL}/list`);
  log.info(`Make sure your server is running on port 3001`);

  const success = await testListUploads();

  log.section('TEST RESULT');
  if (success) {
    log.success('Test passed! ✅');
  } else {
    log.error('Test failed! ❌');
  }
}

// Check if axios is installed
try {
  require.resolve('axios');
  runTest();
} catch (error) {
  console.error('Missing dependency. Please install:');
  console.error('npm install axios');
}
