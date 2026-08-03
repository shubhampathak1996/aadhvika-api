const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testUpload() {
  try {
    // Create a simple test image file
    const testImageContent =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    // Create form data
    const form = new FormData();

    // Create a buffer from base64 data
    const base64Data = testImageContent.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Add the file to form data
    form.append('image', buffer, {
      filename: 'test-image.png',
      contentType: 'image/png',
    });

    console.log('Sending upload request...');

    const response = await fetch('http://localhost:4000/uploads', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });

    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      const data = JSON.parse(result);
      console.log('\n✅ Upload successful!');
      console.log(
        'File path:',
        data.filePath || data.data?.filePath || data.url || data.path,
      );
    } else {
      console.log('\n❌ Upload failed');
    }
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testUpload();
