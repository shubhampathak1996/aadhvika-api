/**
 * Test Script for Contact Form API
 *
 * Tests the contact form submission with validation
 *
 * Usage: node test-contact-api.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3001/contacts';

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

// Test 1: Valid contact submission
async function testValidContact() {
  log.section('TEST 1: Submit Valid Contact Form');

  try {
    const contactData = {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      query: 'I would like to inquire about your services.',
    };

    const response = await axios.post(BASE_URL, contactData);

    if (response.status === 201 && response.data.success) {
      log.success('Contact form submitted successfully');
      log.info(`Contact ID: ${response.data.data._id}`);
      log.info(`Name: ${response.data.data.name}`);
      log.info(`Email: ${response.data.data.email}`);
      return true;
    } else {
      log.error('Unexpected response');
      console.log(response.data);
      return false;
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
    if (error.response) {
      console.log('Response:', error.response.data);
    }
    return false;
  }
}

// Test 2: Missing name field
async function testMissingName() {
  log.section('TEST 2: Submit Form Without Name (Should Fail)');

  try {
    const contactData = {
      phone: '+1234567890',
      email: 'john.doe@example.com',
      query: 'I would like to inquire about your services.',
    };

    const response = await axios.post(BASE_URL, contactData);
    log.error('Should have failed validation');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      log.success('Validation correctly rejected missing name');
      log.info(`Error message: ${error.response.data.message}`);
      return true;
    } else {
      log.error(`Unexpected error: ${error.message}`);
      return false;
    }
  }
}

// Test 3: Invalid email
async function testInvalidEmail() {
  log.section('TEST 3: Submit Form With Invalid Email (Should Fail)');

  try {
    const contactData = {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'invalid-email',
      query: 'I would like to inquire about your services.',
    };

    const response = await axios.post(BASE_URL, contactData);
    log.error('Should have failed validation');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      log.success('Validation correctly rejected invalid email');
      log.info(`Error message: ${error.response.data.message}`);
      return true;
    } else {
      log.error(`Unexpected error: ${error.message}`);
      return false;
    }
  }
}

// Test 4: Short phone number
async function testShortPhone() {
  log.section('TEST 4: Submit Form With Short Phone (Should Fail)');

  try {
    const contactData = {
      name: 'John Doe',
      phone: '123',
      email: 'john.doe@example.com',
      query: 'I would like to inquire about your services.',
    };

    const response = await axios.post(BASE_URL, contactData);
    log.error('Should have failed validation');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      log.success('Validation correctly rejected short phone number');
      log.info(`Error message: ${error.response.data.message}`);
      return true;
    } else {
      log.error(`Unexpected error: ${error.message}`);
      return false;
    }
  }
}

// Test 5: Short query
async function testShortQuery() {
  log.section('TEST 5: Submit Form With Short Query (Should Fail)');

  try {
    const contactData = {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      query: 'Hi',
    };

    const response = await axios.post(BASE_URL, contactData);
    log.error('Should have failed validation');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      log.success('Validation correctly rejected short query');
      log.info(`Error message: ${error.response.data.message}`);
      return true;
    } else {
      log.error(`Unexpected error: ${error.message}`);
      return false;
    }
  }
}

// Run all tests
async function runTests() {
  console.log(
    `${colors.yellow}═══════════════════════════════════════════${colors.reset}`,
  );
  console.log(`${colors.yellow}  CONTACT FORM API TEST SUITE${colors.reset}`);
  console.log(
    `${colors.yellow}═══════════════════════════════════════════${colors.reset}`,
  );

  log.info(`Testing API at: ${BASE_URL}`);

  const results = {
    passed: 0,
    failed: 0,
  };

  // Run tests sequentially
  if (await testValidContact()) results.passed++;
  else results.failed++;
  if (await testMissingName()) results.passed++;
  else results.failed++;
  if (await testInvalidEmail()) results.passed++;
  else results.failed++;
  if (await testShortPhone()) results.passed++;
  else results.failed++;
  if (await testShortQuery()) results.passed++;
  else results.failed++;

  // Summary
  log.section('TEST SUMMARY');
  console.log(`${colors.green}Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${results.failed}${colors.reset}`);
  console.log(`Total: ${results.passed + results.failed}`);

  if (results.failed === 0) {
    log.success('All tests passed! 🎉');
  } else {
    log.error('Some tests failed. Please check the output above.');
  }
}

// Check if axios is installed
try {
  require.resolve('axios');
  runTests();
} catch (error) {
  console.error('Missing dependency. Please install:');
  console.error('npm install axios');
}
