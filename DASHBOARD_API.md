# Dashboard API Documentation

The Dashboard API provides comprehensive analytics and statistics for your medical platform content management system.

## Base URL

```
/dashboard
```

## Available Endpoints

### 1. Overview Statistics

**GET** `/overview`

Returns total counts for all content types in your platform.

**Response:**

```json
{
  "success": true,
  "data": {
    "content": {
      "banners": 15,
      "blogs": 45,
      "news": 20,
      "events": 12
    },
    "medical": {
      "conditions": 85,
      "treatments": 120,
      "specializedClinics": 35
    },
    "management": {
      "categories": 25,
      "celebrities": 18,
      "galleryItems": 150
    },
    "totals": {
      "allContent": 92,
      "allMedical": 240,
      "allItems": 525
    }
  }
}
```

### 2. Content Statistics with Status Breakdown

**GET** `/content-stats`

Returns content statistics grouped by status (draft/published/scheduled).

**Response:**

```json
{
  "success": true,
  "data": {
    "blogs": {
      "draft": 12,
      "published": 28,
      "scheduled": 5,
      "total": 45
    },
    "conditions": {
      "draft": 8,
      "published": 72,
      "scheduled": 5,
      "total": 85
    },
    "treatments": {
      "draft": 15,
      "published": 100,
      "scheduled": 5,
      "total": 120
    },
    "specializedClinics": {
      "draft": 5,
      "published": 28,
      "scheduled": 2,
      "total": 35
    }
  }
}
```

### 3. Recent Activity

**GET** `/recent-activity?limit=10`

Returns the most recently created items across all content types.

**Query Parameters:**

- `limit` (optional): Number of items to return (default: 10)

**Response:**

```json
{
  "success": true,
  "data": {
    "recentItems": [
      {
        "_id": "64a1234567890abcdef12345",
        "title": "Latest Medical Treatment Update",
        "createdAt": "2024-10-07T10:30:00.000Z",
        "status": "published",
        "type": "treatment"
      },
      {
        "_id": "64a1234567890abcdef12346",
        "title": "Heart Disease Prevention Tips",
        "createdAt": "2024-10-07T09:15:00.000Z",
        "status": "draft",
        "type": "blog"
      }
    ],
    "byType": {
      "blogs": [...],
      "news": [...],
      "events": [...],
      "conditions": [...],
      "treatments": [...]
    }
  }
}
```

### 4. Popular Content

**GET** `/popular-content?limit=10`

Returns popular content (currently based on recent published items, can be enhanced with view counts).

**Query Parameters:**

- `limit` (optional): Number of items to return (default: 10)

**Response:**

```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "_id": "64a1234567890abcdef12347",
        "title": "Top 10 Health Tips for 2024",
        "createdAt": "2024-10-06T14:20:00.000Z",
        "status": "published"
      }
    ],
    "news": [...],
    "events": [...]
  }
}
```

### 5. Monthly Statistics

**GET** `/monthly-stats?year=2024`

Returns monthly statistics for charts and analytics.

**Query Parameters:**

- `year` (optional): Year for statistics (default: current year)

**Response:**

```json
{
  "success": true,
  "data": {
    "year": 2024,
    "months": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    "data": {
      "blogs": [5, 8, 12, 15, 10, 8, 12, 18, 22, 25, 0, 0],
      "news": [3, 5, 8, 10, 7, 6, 9, 12, 15, 18, 0, 0],
      "events": [2, 3, 4, 6, 5, 4, 6, 8, 10, 12, 0, 0],
      "conditions": [8, 12, 15, 18, 12, 10, 15, 20, 25, 30, 0, 0]
    }
  }
}
```

### 6. Dashboard Summary

**GET** `/summary`

Returns a comprehensive dashboard summary combining overview, content stats, and recent activity.

**Response:**

```json
{
  "success": true,
  "data": {
    "overview": {
      "content": { ... },
      "medical": { ... },
      "management": { ... }
    },
    "contentStatus": {
      "blogs": { ... },
      "conditions": { ... },
      "treatments": { ... },
      "specializedClinics": { ... }
    },
    "recentActivity": [
      { ... }
    ]
  }
}
```

## Content Types

The dashboard tracks the following content types:

### Content Management

- **Banners**: Website banners and promotional content
- **Blogs**: Blog articles and posts
- **News**: News articles
- **Events**: Event listings and announcements

### Medical Content

- **Conditions**: Medical conditions and diseases
- **Treatments**: Medical treatments and procedures
- **Specialized Clinics**: Specialized medical clinics and departments

### Supporting Content

- **Categories**: Content categories and tags
- **Celebrities**: Celebrity profiles and endorsements
- **Gallery**: Image galleries and media content

## Status Types

Content items can have the following status values:

- `draft`: Content in draft stage
- `published`: Published and live content
- `scheduled`: Content scheduled for future publication

## Usage Examples

### Frontend Dashboard Implementation

```javascript
// Fetch overview statistics
const getOverviewStats = async () => {
  try {
    const response = await fetch('/api/dashboard/overview');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching overview stats:', error);
  }
};

// Fetch complete dashboard summary
const getDashboardSummary = async () => {
  try {
    const response = await fetch('/api/dashboard/summary');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
  }
};

// Fetch monthly stats for charts
const getMonthlyStats = async (year = new Date().getFullYear()) => {
  try {
    const response = await fetch(`/api/dashboard/monthly-stats?year=${year}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching monthly stats:', error);
  }
};
```

### Chart.js Integration Example

```javascript
// Use monthly stats for Chart.js
const monthlyData = await getMonthlyStats(2024);

const chartConfig = {
  type: 'line',
  data: {
    labels: monthlyData.months,
    datasets: [
      {
        label: 'Blogs',
        data: monthlyData.data.blogs,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'News',
        data: monthlyData.data.news,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Events',
        data: monthlyData.data.events,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Content Creation Trends',
      },
    },
  },
};
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

## Authentication

Dashboard endpoints can be configured with authentication middleware as needed. Currently, they are accessible without authentication, but you can add authentication by importing your auth middleware and applying it to the routes.

Example:

```typescript
// In DashboardRoutes.ts
import { authenticateToken } from '../middlewares/auth';

router.get(
  '/overview',
  authenticateToken,
  DashboardController.getOverviewStats
);
```

## Performance Considerations

- All count operations use MongoDB's `countDocuments()` for efficiency
- Aggregation pipelines are optimized for large datasets
- Consider adding caching for frequently accessed dashboard data
- Monthly stats are calculated on-demand but could be cached or pre-computed for better performance

## Future Enhancements

Potential features to add:

- View count tracking for popular content
- User engagement metrics
- Content performance analytics
- Real-time updates using WebSockets
- Export functionality for reports
- Custom date range filtering
- Content approval workflow statistics
