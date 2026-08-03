# Image Library API - List Uploads Endpoint

## Overview

New endpoint added to support image library functionality - allows frontend to fetch and display all previously uploaded images.

---

## Endpoint

### List All Uploaded Images

**URL:** `GET /uploads/list`

**Description:** Returns an array of all image files in the uploads folder. This allows users to select previously uploaded images instead of uploading duplicates.

**Method:** `GET`

**Authentication:** None

---

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "Found 15 image(s) in uploads folder",
  "data": [
    {
      "filename": "1735689600000-123456789-image1.jpg",
      "url": "/uploads/1735689600000-123456789-image1.jpg"
    },
    {
      "filename": "1735689601000-987654321-image2.png",
      "url": "/uploads/1735689601000-987654321-image2.png"
    }
  ],
  "total": 15
}
```

### Error Response (500)

```json
{
  "success": false,
  "message": "Failed to read uploads directory",
  "error": "ENOENT: no such file or directory"
}
```

---

## Features

✅ **Async/Await** - Modern promise-based implementation  
✅ **Image Filtering** - Only returns image files (jpg, jpeg, png, gif, webp)  
✅ **Non-Image Filter** - Automatically ignores non-image files  
✅ **Error Handling** - Comprehensive error responses  
✅ **Clean Response** - Consistent format with filename and URL  
✅ **Count Total** - Includes total number of images found

---

## Usage Examples

### Using cURL

```bash
curl http://localhost:3001/uploads/list
```

### Using JavaScript Fetch

```javascript
// Fetch all uploaded images
const getUploadedImages = async () => {
  try {
    const response = await fetch('http://localhost:3001/uploads/list');
    const result = await response.json();

    if (result.success) {
      console.log(`Found ${result.total} images`);
      result.data.forEach((image) => {
        console.log(`${image.filename} -> ${image.url}`);
      });
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

// Use in your component
getUploadedImages();
```

### Using Axios

```javascript
import axios from 'axios';

const fetchImageLibrary = async () => {
  try {
    const response = await axios.get('http://localhost:3001/uploads/list');
    return response.data.data; // Array of {filename, url}
  } catch (error) {
    console.error('Failed to fetch image library:', error);
    throw error;
  }
};
```

---

## Frontend Integration Example

### React Component

```jsx
import React, { useEffect, useState } from 'react';

function ImageLibrary() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/uploads/list');
      const result = await response.json();

      if (result.success) {
        setImages(result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    // Use the selected image URL instead of uploading a new one
    console.log('Selected:', image.url);
  };

  if (loading) return <div>Loading images...</div>;

  return (
    <div className="image-library">
      <h2>Image Library ({images.length} images)</h2>
      <div className="image-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item"
            onClick={() => handleSelectImage(image)}
          >
            <img
              src={image.url}
              alt={image.filename}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                cursor: 'pointer',
                border:
                  selectedImage?.filename === image.filename
                    ? '3px solid blue'
                    : '1px solid #ccc',
              }}
            />
            <p>{image.filename}</p>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="selected-image">
          <h3>Selected Image:</h3>
          <p>Filename: {selectedImage.filename}</p>
          <p>URL: {selectedImage.url}</p>
        </div>
      )}
    </div>
  );
}

export default ImageLibrary;
```

### Vue Component

```vue
<template>
  <div class="image-library">
    <h2>Image Library ({{ images.length }} images)</h2>
    <div class="image-grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        @click="selectImage(image)"
        class="image-item"
      >
        <img
          :src="image.url"
          :alt="image.filename"
          :class="{ selected: selectedImage?.filename === image.filename }"
        />
        <p>{{ image.filename }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      selectedImage: null,
      loading: true,
    };
  },
  async mounted() {
    await this.fetchImages();
  },
  methods: {
    async fetchImages() {
      try {
        const response = await fetch('http://localhost:3001/uploads/list');
        const result = await response.json();

        if (result.success) {
          this.images = result.data;
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        this.loading = false;
      }
    },
    selectImage(image) {
      this.selectedImage = image;
      this.$emit('image-selected', image);
    },
  },
};
</script>

<style scoped>
.image-item {
  cursor: pointer;
  padding: 10px;
}
.image-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 1px solid #ccc;
}
.image-item img.selected {
  border: 3px solid blue;
}
</style>
```

---

## Use Cases

### 1. **Image Selection Instead of Upload**

Users can browse previously uploaded images and select them for use, avoiding duplicate uploads.

### 2. **Image Gallery Management**

Display all uploaded images in an admin dashboard for management purposes.

### 3. **Content Reuse**

Select existing images when creating new blog posts, products, or content.

### 4. **Image Library Browser**

Build a media library interface where users can search and select from uploaded images.

---

## Implementation Details

### File Filtering

- Only returns files with extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Case-insensitive extension matching
- Automatically ignores non-image files (e.g., `.txt`, `.pdf`, etc.)

### Response Format

Each image object contains:

- `filename`: The actual filename stored on the server
- `url`: The accessible URL path for the image (relative path)

### Error Handling

- Catches and returns filesystem errors
- Provides descriptive error messages
- Returns 500 status code on failure

---

## Testing

### Manual Test

1. Start your server:

```bash
npm run dev
```

2. Upload some images first (if needed):

```bash
curl -X POST http://localhost:3001/uploads \
  -F "image=@/path/to/image1.jpg"
```

3. List all uploaded images:

```bash
curl http://localhost:3001/uploads/list
```

### Expected Response

```json
{
  "success": true,
  "message": "Found 3 image(s) in uploads folder",
  "data": [
    {
      "filename": "1735689600000-123456789-image1.jpg",
      "url": "/uploads/1735689600000-123456789-image1.jpg"
    },
    {
      "filename": "1735689601000-987654321-image2.png",
      "url": "/uploads/1735689601000-987654321-image2.png"
    },
    {
      "filename": "1735689602000-456789123-image3.gif",
      "url": "/uploads/1735689602000-456789123-image3.gif"
    }
  ],
  "total": 3
}
```

---

## Notes

- The endpoint reads the physical uploads folder on each request
- No database queries required
- Images are served as static files via the existing `/uploads` middleware
- All uploaded images (via any endpoint) will appear in the list
- The list reflects the current state of the uploads folder
- Perfect for building "select existing image" functionality in frontends

---

## Related Endpoints

- `POST /uploads` - Upload single image
- `POST /uploads/banner` - Upload banner images
- `POST /uploads/gallery` - Upload multiple gallery images
- `GET /uploads/:filename` - Access uploaded image (static serving)

---

## Summary

✅ **Endpoint Added:** `GET /uploads/list`  
✅ **Returns:** Array of all image files with filename and URL  
✅ **Filtering:** Only image files (jpg, jpeg, png, gif, webp)  
✅ **Async:** Uses fs.promises for non-blocking operations  
✅ **Error Handling:** Comprehensive error responses  
✅ **Use Case:** Frontend image library/selection system

Your upload API now supports complete image library functionality! 🎉
